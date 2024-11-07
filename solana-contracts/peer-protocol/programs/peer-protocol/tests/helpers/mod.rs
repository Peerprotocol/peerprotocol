use anchor_lang::AccountDeserialize;
use anchor_spl::{
    associated_token, mint,
    token::{spl_token, Mint},
};
use peer_protocol::constants as peer_protocol_constants;
use solana_program_test::ProgramTestContext;
use solana_sdk::{
    pubkey::Pubkey, signature::Keypair, signer::Signer, system_instruction,
    transaction::Transaction,
};

pub mod setup_test;
pub mod utils;

#[derive(Debug, PartialEq, Eq, PartialOrd, Ord)]
pub enum PdaType {
    UserProfile { key: Pubkey },
    UserDeposit { key: Pubkey },
    LoanOffer { key: Pubkey, lending_count: u64 },
    Asset { key: Pubkey },
}

pub async fn load_and_deserialize<T: AccountDeserialize>(
    ctx: &mut ProgramTestContext,
    address: Pubkey,
) -> T {
    let account = ctx
        .banks_client
        .get_account(address)
        .await
        .unwrap()
        .unwrap();

    T::try_deserialize(&mut account.data.as_slice()).unwrap()
}

pub async fn get_balance(ctx: &mut ProgramTestContext, address: Pubkey) -> u64 {
    ctx.banks_client.get_balance(address).await.unwrap()
}

pub fn get_pda(pda_type: PdaType) -> (Pubkey, u8) {
    let seeds: &[&[u8]] = match pda_type {
        PdaType::UserProfile { key } => {
            &[peer_protocol_constants::USER_PROFILE_TAG, &key.to_bytes()]
        }
        PdaType::UserDeposit { key } => {
            &[peer_protocol_constants::USER_DEPOSIT_TAG, &key.to_bytes()]
        }
        PdaType::LoanOffer { key, lending_count } => &[
            peer_protocol_constants::LOAN_OFFER_TAG,
            &key.to_bytes(),
            &lending_count.to_le_bytes(),
        ],
        PdaType::Asset { key } => &[peer_protocol_constants::ASSET_TAG, &key.to_bytes()],
    };

    Pubkey::find_program_address(seeds, &peer_protocol::ID)
}

pub async fn create_spl_token(
    ctx: &mut ProgramTestContext,
    admin: &Keypair,
    mint: &Keypair,
    decimals: u8,
) {
    let rent = ctx.banks_client.get_rent().await.unwrap();
    let mint_rent = rent.minimum_balance(Mint::LEN);

    let create_mint_account_ix = system_instruction::create_account(
        &admin.pubkey(),
        &mint.pubkey(),
        mint_rent,
        Mint::LEN as u64,
        &spl_token::ID,
    );

    let initialize_mint_ix = spl_token::instruction::initialize_mint(
        &spl_token::ID,
        &mint.pubkey(),
        &admin.pubkey(),
        None,
        decimals,
    )
    .unwrap();

    let create_initialize_mint_tx = Transaction::new_signed_with_payer(
        &[create_mint_account_ix, initialize_mint_ix],
        Some(&admin.pubkey()),
        &[&admin, &mint],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction(create_initialize_mint_tx)
        .await
        .unwrap();
}

pub async fn init_ata_mint(
    ctx: &mut ProgramTestContext,
    admin: &Keypair,
    user: &Keypair,
    ata: &Pubkey,
    mint: &Pubkey,
    amount: u64,
) {
    let mint_info: Mint = load_and_deserialize(ctx, mint.clone()).await;

    let init_ata_ix = associated_token::spl_associated_token_account::instruction::create_associated_token_account(&admin.pubkey(), &user.pubkey(), mint, &spl_token::ID);

    let mint_to_ix = spl_token::instruction::mint_to(
        &spl_token::ID,
        mint,
        ata,
        &admin.pubkey(),
        &[],
        amount * mint_info.decimals as u64,
    )
    .unwrap();

    let init_ata_mint_to_tx = Transaction::new_signed_with_payer(
        &[init_ata_ix, mint_to_ix],
        Some(&admin.pubkey()),
        &[&admin],
        ctx.get_new_latest_blockhash().await.unwrap(),
    );

    ctx.banks_client
        .process_transaction(init_ata_mint_to_tx)
        .await
        .unwrap();
}
