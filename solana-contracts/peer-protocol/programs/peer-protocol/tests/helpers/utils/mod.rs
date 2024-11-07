use anchor_lang::{system_program, InstructionData, ToAccountMetas};
use anchor_spl::{
    associated_token::{self, get_associated_token_address},
    token::spl_token,
};
use peer_protocol::state::{loan_sol::LoanSol, loan_spl::LoanSpl, user_profile::UserProfile};
use solana_program_test::ProgramTestContext;
use solana_sdk::{
    commitment_config::CommitmentLevel, instruction::Instruction, pubkey::Pubkey,
    signature::Keypair, signer::Signer, transaction::Transaction,
};

use super::{get_pda, load_and_deserialize, setup_test::User};

pub async fn init_protocol(ctx: &mut ProgramTestContext, admin: &Keypair, protocol: &Keypair) {
    let init_protocol_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::InitProtocol {
            authority: admin.pubkey(),
            protocol: protocol.pubkey(),
            system_program: system_program::ID,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::InitProtocol {}.data(),
    };

    let init_protocol_tx = Transaction::new_signed_with_payer(
        &[init_protocol_ix],
        Some(&admin.pubkey()),
        &[admin, protocol],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(init_protocol_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn init_user(ctx: &mut ProgramTestContext, user: &User, protocol: &Keypair) {
    let init_user_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::InitUser {
            authority: user.user_keypair.pubkey(),
            protocol: protocol.pubkey(),
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::InitUser {}.data(),
    };

    let init_user_tx = Transaction::new_signed_with_payer(
        &[init_user_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(init_user_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn deposit_sol(
    ctx: &mut ProgramTestContext,
    user: &User,
    protocol: &Keypair,
    amount: u64,
) {
    let deposit_sol_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::DepositSol {
            authority: user.user_keypair.pubkey(),
            protocol: protocol.pubkey(),
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::DepositSol { amount }.data(),
    };

    let deposit_sol_tx = Transaction::new_signed_with_payer(
        &[deposit_sol_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(deposit_sol_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn withdraw_sol(
    ctx: &mut ProgramTestContext,
    user: &User,
    protocol: Pubkey,
    amount: u64,
) {
    let withdraw_sol_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::WithdrawSol {
            authority: user.user_keypair.pubkey(),
            protocol,
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::WithdrawSol { amount }.data(),
    };

    let withdraw_sol_tx = Transaction::new_signed_with_payer(
        &[withdraw_sol_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(withdraw_sol_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn init_asset(
    ctx: &mut ProgramTestContext,
    admin: &Keypair,
    mint: Pubkey,
    protocol: Pubkey,
) {
    let (asset, _) = get_pda(super::PdaType::Asset { key: mint });

    let init_asset_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::InitAsset {
            admin: admin.pubkey(),
            asset,
            mint,
            protocol,
            system_program: system_program::ID,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::InitAsset {}.data(),
    };

    let init_asset_tx = Transaction::new_signed_with_payer(
        &[init_asset_ix],
        Some(&admin.pubkey()),
        &[admin],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(init_asset_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn deposit_spl(
    ctx: &mut ProgramTestContext,
    user: &User,
    mint: Pubkey,
    protocol: Pubkey,
    deposit_amount: u64,
) {
    let user_profile_ata = get_associated_token_address(&user.user_profile_pda, &mint);
    let (asset, _) = get_pda(super::PdaType::Asset { key: mint });

    let deposit_spl_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::DepositSpl {
            authority: user.user_keypair.pubkey(),
            mint,
            associated_token_program: associated_token::ID,
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
            protocol,
            token_program: spl_token::ID,
            user_profile_ata,
            asset,
            user_ata: user.mint_a_ata,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::DepositSpl {
            amount: deposit_amount,
        }
        .data(),
    };

    let deposit_spl_tx = Transaction::new_signed_with_payer(
        &[deposit_spl_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(deposit_spl_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn withdraw_spl(
    ctx: &mut ProgramTestContext,
    authority: &User,
    mint: Pubkey,
    protocol: Pubkey,
    user_profile_ata: Pubkey,
    withdraw_amount: u64,
) {
    let withdraw_spl_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::WithdrawSpl {
            authority: authority.user_keypair.pubkey(),
            mint,
            protocol,
            token_program: spl_token::ID,
            user_profile: authority.user_profile_pda,
            user_ata: authority.mint_a_ata,
            user_profile_ata,
            associated_token_program: associated_token::ID,
            system_program: system_program::ID,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::WithdrawSpl {
            amount: withdraw_amount,
        }
        .data(),
    };

    let withdraw_spl_tx = Transaction::new_signed_with_payer(
        &[withdraw_spl_ix],
        Some(&authority.user_keypair.pubkey()),
        &[&authority.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(withdraw_spl_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn lend_sol(
    ctx: &mut ProgramTestContext,
    user: &User,
    protocol: Pubkey,
    duration: i64,
    interest_rate: u8,
    loan_amount: u64,
    ltv_ratio: u8,
) -> Pubkey {
    let user_profile_data: UserProfile = load_and_deserialize(ctx, user.user_profile_pda).await;
    let loan = get_pda(super::PdaType::LoanOffer {
        key: user.user_keypair.pubkey(),
        lending_count: user_profile_data.lending_count + 1,
    })
    .0;

    let lend_sol_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::CreateLoanSol {
            authority: user.user_keypair.pubkey(),
            loan,
            protocol,
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::CreateLoanSol {
            duration,
            interest_rate,
            loan_amount,
            ltv_ratio,
        }
        .data(),
    };

    let lend_sol_tx = Transaction::new_signed_with_payer(
        &[lend_sol_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(lend_sol_tx, CommitmentLevel::Processed)
        .await
        .unwrap();

    loan
}

pub async fn borrow_sol(ctx: &mut ProgramTestContext, user: &User, protocol: Pubkey, loan: Pubkey) {
    let loan_info: LoanSol = load_and_deserialize(ctx, loan).await;
    let borrow_sol_ix = Instruction {
        accounts: peer_protocol::accounts::BorrowSol {
            authority: user.user_keypair.pubkey(),
            loan,
            protocol,
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::BorrowSol {
            loan_idx: loan_info.loan_idx,
        }
        .data(),
        program_id: peer_protocol::ID,
    };

    let borrow_sol_tx = Transaction::new_signed_with_payer(
        &[borrow_sol_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(borrow_sol_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}

pub async fn create_loan_spl(
    ctx: &mut ProgramTestContext,
    user: &User,
    protocol: Pubkey,
    mint: Pubkey,
    duration: i64,
    interest_rate: u8,
    loan_amount: u64,
    ltv_ratio: u8,
) -> Pubkey {
    let user_profile_ata = get_associated_token_address(&user.user_profile_pda, &mint);
    let user_profile_data: UserProfile = load_and_deserialize(ctx, user.user_profile_pda).await;
    let loan = get_pda(super::PdaType::LoanOffer {
        key: user.user_keypair.pubkey(),
        lending_count: user_profile_data.lending_count + 1,
    })
    .0;
    let loan_ata = get_associated_token_address(&loan, &mint);

    let create_loan_spl_ix = Instruction {
        accounts: peer_protocol::accounts::CreateLoanSpl {
            authority: user.user_keypair.pubkey(),
            loan,
            loan_ata,
            mint,
            protocol,
            system_program: system_program::ID,
            token_program: spl_token::ID,
            associated_token_program: associated_token::ID,
            user_profile: user.user_profile_pda,
            user_profile_ata,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::CreateLoanSpl {
            duration,
            interest_rate,
            loan_amount,
            ltv_ratio,
        }
        .data(),
        program_id: peer_protocol::ID,
    };

    let create_loan_spl_tx = Transaction::new_signed_with_payer(
        &[create_loan_spl_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(create_loan_spl_tx, CommitmentLevel::Processed)
        .await
        .unwrap();

    loan
}

pub async fn borrow_spl(
    ctx: &mut ProgramTestContext,
    user: &User,
    protocol: Pubkey,
    loan: Pubkey,
    mint: Pubkey,
) {
    let loan_info: LoanSpl = load_and_deserialize(ctx, loan).await;
    let loan_ata = get_associated_token_address(&loan, &mint);
    let user_profile_ata = get_associated_token_address(&user.user_profile_pda, &mint);

    let borrow_spl_ix = Instruction {
        program_id: peer_protocol::ID,
        accounts: peer_protocol::accounts::BorrowSpl {
            authority: user.user_keypair.pubkey(),
            loan,
            protocol,
            system_program: system_program::ID,
            user_profile: user.user_profile_pda,
            loan_ata,
            mint,
            token_program: spl_token::ID,
            user_profile_ata,
            associated_token_program: associated_token::ID,
        }
        .to_account_metas(None),
        data: peer_protocol::instruction::BorrowSpl {
            loan_idx: loan_info.loan_idx,
        }
        .data(),
    };

    let borrow_spl_tx = Transaction::new_signed_with_payer(
        &[borrow_spl_ix],
        Some(&user.user_keypair.pubkey()),
        &[&user.user_keypair],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction_with_commitment(borrow_spl_tx, CommitmentLevel::Processed)
        .await
        .unwrap();
}
