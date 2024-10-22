mod helpers;

use anchor_spl::associated_token::get_associated_token_address;
use anchor_spl::token::TokenAccount;
use helpers::utils;
use helpers::{get_balance, setup_test::SetupTest};
use peer_protocol::state::loan_sol::LoanSol;
use peer_protocol::state::loan_spl::LoanSpl;
use peer_protocol::state::{protocol::Protocol as PeerProtocolState, user_profile::UserProfile};

use solana_program_test::tokio;
use solana_sdk::native_token::LAMPORTS_PER_SOL;
use solana_sdk::signer::Signer as _;

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_init() {
    let SetupTest {
        validator,
        admin,
        protocol,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;

    utils::init_protocol(&mut context, &admin, &protocol).await;

    let protocol_account: PeerProtocolState =
        helpers::load_and_deserialize(&mut context, protocol.pubkey()).await;

    assert!(
        protocol_account.is_init,
        "protocol account should be initialized"
    )
    // assert_eq!(
    //     protocol_account.authority,
    //     admin.pubkey(),
    //     "protocol account authority should be admin"
    // );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_init_user() {
    let SetupTest {
        validator,
        admin,
        protocol,
        users,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;

    utils::init_protocol(&mut context, &admin, &protocol).await;

    for user in users.iter() {
        utils::init_user(&mut context, &user, &protocol).await;
    }

    for user in users.iter() {
        let user_profile_account: UserProfile =
            helpers::load_and_deserialize(&mut context, user.user_profile_pda).await;

        assert!(
            user_profile_account.is_init,
            "user profile account should be initialized"
        );
        assert_eq!(
            user_profile_account.authority,
            user.user_keypair.pubkey(),
            "user profile account authority should be the user"
        );
        assert_eq!(
            user_profile_account.bump, user.user_profile_pda_bump,
            "bump should be correct"
        );
        assert_eq!(
            user_profile_account.borrowing_count, 0,
            "borrowing count should be 0"
        );
        assert_eq!(
            user_profile_account.lending_count, 0,
            "lending count should be 0"
        );
    }
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_deposit_sol() {
    let SetupTest {
        validator,
        admin,
        protocol,
        users,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let deposit_amount = 1 * LAMPORTS_PER_SOL;

    utils::init_protocol(&mut context, &admin, &protocol).await;

    utils::init_user(&mut context, user, &protocol).await;

    let initial_user_profile_sol_balance = get_balance(&mut context, user.user_profile_pda).await;

    utils::deposit_sol(&mut context, user, &protocol, deposit_amount).await;

    let final_user_profile_sol_balance = get_balance(&mut context, user.user_profile_pda).await;

    assert_eq!(
        final_user_profile_sol_balance,
        initial_user_profile_sol_balance + deposit_amount,
        "user profile sol balance should be increased by deposit amount"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_withdraw_sol() {
    let SetupTest {
        validator,
        admin,
        protocol,
        users,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let deposit_amount = 1 * LAMPORTS_PER_SOL;
    let withdraw_amount = (1 * LAMPORTS_PER_SOL) / 2;

    utils::init_protocol(&mut context, &admin, &protocol).await;
    utils::init_user(&mut context, user, &protocol).await;

    utils::deposit_sol(&mut context, user, &protocol, deposit_amount).await;

    let initial_user_profile_sol_balance = get_balance(&mut context, user.user_profile_pda).await;
    let initial_user_sol_balance = get_balance(&mut context, user.user_keypair.pubkey()).await;

    utils::withdraw_sol(&mut context, user, protocol.pubkey(), withdraw_amount).await;

    let final_user_profile_sol_balance = get_balance(&mut context, user.user_profile_pda).await;
    let final_user_sol_balance = get_balance(&mut context, user.user_keypair.pubkey()).await;

    assert!(
        final_user_profile_sol_balance < initial_user_profile_sol_balance,
        "user profile sol balance should be decreased by withdraw amount"
    );
    assert!(
        final_user_sol_balance > initial_user_sol_balance,
        "user final sol balance should be greater than initial sol balance"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_deposit_spl() {
    let SetupTest {
        validator,
        admin,
        users,
        mint_a,
        protocol,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let token_amount = 1000;
    let deposit_amount = 100;

    utils::init_protocol(&mut context, &admin, &protocol).await;
    utils::init_user(&mut context, user, &protocol).await;

    helpers::create_spl_token(&mut context, &admin, &mint_a, 9).await;
    helpers::init_ata_mint(
        &mut context,
        &admin,
        &user.user_keypair,
        &user.mint_a_ata,
        &mint_a.pubkey(),
        token_amount,
    )
    .await;
    utils::init_asset(&mut context, &admin, mint_a.pubkey(), protocol.pubkey()).await;
    utils::deposit_spl(
        &mut context,
        user,
        mint_a.pubkey(),
        protocol.pubkey(),
        deposit_amount,
    )
    .await;

    let user_profile_ata = get_associated_token_address(&user.user_profile_pda, &mint_a.pubkey());
    let user_profile_ata_account: TokenAccount =
        helpers::load_and_deserialize(&mut context, user_profile_ata).await;

    assert_eq!(
        user_profile_ata_account.amount, deposit_amount,
        "user profile ata amount should be equal to deposit amount"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_withdraw_spl() {
    let SetupTest {
        validator,
        admin,
        users,
        mint_a,
        protocol,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let token_amount = 1000;
    let deposit_amount = 100;

    utils::init_protocol(&mut context, &admin, &protocol).await;
    utils::init_user(&mut context, user, &protocol).await;

    helpers::create_spl_token(&mut context, &admin, &mint_a, 9).await;
    helpers::init_ata_mint(
        &mut context,
        &admin,
        &user.user_keypair,
        &user.mint_a_ata,
        &mint_a.pubkey(),
        token_amount,
    )
    .await;
    utils::init_asset(&mut context, &admin, mint_a.pubkey(), protocol.pubkey()).await;
    utils::deposit_spl(
        &mut context,
        user,
        mint_a.pubkey(),
        protocol.pubkey(),
        deposit_amount,
    )
    .await;

    let user_profile_ata = get_associated_token_address(&user.user_profile_pda, &mint_a.pubkey());
    let user_profile_ata_account_before: TokenAccount =
        helpers::load_and_deserialize(&mut context, user_profile_ata).await;

    let withdraw_amount = deposit_amount / 2;

    utils::withdraw_spl(
        &mut context,
        user,
        mint_a.pubkey(),
        protocol.pubkey(),
        user_profile_ata,
        withdraw_amount,
    )
    .await;

    let user_profile_ata_account_after: TokenAccount =
        helpers::load_and_deserialize(&mut context, user_profile_ata).await;

    assert_eq!(
        user_profile_ata_account_after.amount,
        user_profile_ata_account_before.amount - withdraw_amount,
        "user profile ata amount should be decreased by withdraw amount"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_lend_sol() {
    let SetupTest {
        validator,
        admin,
        protocol,
        users,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let deposit_amount = 1 * LAMPORTS_PER_SOL;
    let loan_duration = 1000;
    let loan_i_rate = 5;
    let loan_amount = (1 * LAMPORTS_PER_SOL) / 2;
    let ltv_ratio = 50;

    utils::init_protocol(&mut context, &admin, &protocol).await;

    utils::init_user(&mut context, user, &protocol).await;

    utils::deposit_sol(&mut context, user, &protocol, deposit_amount).await;

    let loan_pda = utils::lend_sol(
        &mut context,
        user,
        protocol.pubkey(),
        loan_duration,
        loan_i_rate,
        loan_amount,
        ltv_ratio,
    )
    .await;

    let loan_account: LoanSol = helpers::load_and_deserialize(&mut context, loan_pda).await;
    let user_profile_account: UserProfile =
        helpers::load_and_deserialize(&mut context, user.user_profile_pda).await;
    let loan_acc_sol_balance = get_balance(&mut context, loan_pda).await;

    assert_eq!(
        loan_account.lender,
        user.user_keypair.pubkey(),
        "loan account authority should be user"
    );
    assert_eq!(
        loan_account.ltv_ratio, ltv_ratio,
        "loan account ltv ratio should be equal to ltv ratio"
    );
    assert_eq!(
        loan_account.duration, loan_duration,
        "loan account duration should be equal to loan duration"
    );
    assert_eq!(
        loan_account.loan_amount, loan_amount,
        "loan account loan amount should be equal to loan amount"
    );
    assert_eq!(
        loan_account.interest_rate, loan_i_rate,
        "loan account interest rate should be equal to loan interest rate"
    );

    assert_eq!(
        user_profile_account.lending_count, 1,
        "user profile lending count should be 1"
    );
    assert!(
        loan_acc_sol_balance > loan_amount,
        "loan account sol balance should be equal to loan amount"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_borrow_sol() {
    let SetupTest {
        validator,
        admin,
        protocol,
        users,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let user = &users[0];
    let borrower = &users[1];
    let deposit_amount = 1 * LAMPORTS_PER_SOL;
    let loan_duration = 1000;
    let loan_i_rate = 5;
    let loan_amount = (1 * LAMPORTS_PER_SOL) / 2;
    let ltv_ratio = 50;

    utils::init_protocol(&mut context, &admin, &protocol).await;

    utils::init_user(&mut context, user, &protocol).await;
    utils::init_user(&mut context, borrower, &protocol).await;

    utils::deposit_sol(&mut context, user, &protocol, deposit_amount).await;

    let loan_pda = utils::lend_sol(
        &mut context,
        user,
        protocol.pubkey(),
        loan_duration,
        loan_i_rate,
        loan_amount,
        ltv_ratio,
    )
    .await;

    let borrower_user_profile_balance_before =
        get_balance(&mut context, borrower.user_profile_pda).await;

    utils::borrow_sol(&mut context, borrower, protocol.pubkey(), loan_pda).await;

    let borrower_user_profile_account: UserProfile =
        helpers::load_and_deserialize(&mut context, borrower.user_profile_pda).await;
    let borrower_user_profile_balance_after =
        get_balance(&mut context, borrower.user_profile_pda).await;

    let borrower_sol_balance_before =
        get_balance(&mut context, borrower.user_keypair.pubkey()).await;

    utils::withdraw_sol(&mut context, borrower, protocol.pubkey(), loan_amount).await;

    let borrower_sol_balance_after =
        get_balance(&mut context, borrower.user_keypair.pubkey()).await;

    assert_eq!(
        borrower_user_profile_account.borrowing_count, 1,
        "borrower user profile borrowing count should be 1"
    );

    assert!(
        borrower_user_profile_balance_after > borrower_user_profile_balance_before,
        "borrower user profile balance should be greater than before"
    );

    assert!(
        borrower_sol_balance_after > borrower_sol_balance_before,
        "borrower sol balance should be greater than before"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_lend_spl() {
    let SetupTest {
        validator,
        admin,
        users,
        mint_a,
        protocol,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let lender = &users[0];
    let token_amount = 1000;
    let deposit_amount = 100;
    let loan_duration = 1000;
    let interest_rate = 5;
    let loan_amount = 50;
    let ltv_ratio = 50;

    utils::init_protocol(&mut context, &admin, &protocol).await;
    utils::init_user(&mut context, lender, &protocol).await;

    helpers::create_spl_token(&mut context, &admin, &mint_a, 9).await;
    helpers::init_ata_mint(
        &mut context,
        &admin,
        &lender.user_keypair,
        &lender.mint_a_ata,
        &mint_a.pubkey(),
        token_amount,
    )
    .await;

    utils::init_asset(&mut context, &admin, mint_a.pubkey(), protocol.pubkey()).await;
    utils::deposit_spl(
        &mut context,
        lender,
        mint_a.pubkey(),
        protocol.pubkey(),
        deposit_amount,
    )
    .await;

    let loan = utils::create_loan_spl(
        &mut context,
        lender,
        protocol.pubkey(),
        mint_a.pubkey(),
        loan_duration,
        interest_rate,
        loan_amount,
        ltv_ratio,
    )
    .await;

    let user_profile_ata = get_associated_token_address(&lender.user_profile_pda, &mint_a.pubkey());
    let user_profile_ata_account: TokenAccount =
        helpers::load_and_deserialize(&mut context, user_profile_ata).await;

    let loan_account: LoanSpl = helpers::load_and_deserialize(&mut context, loan).await;

    assert_eq!(
        user_profile_ata_account.amount, loan_amount,
        "user profile ata amount should be equal to loan amount"
    );

    assert_eq!(
        loan_account.lender,
        lender.user_keypair.pubkey(),
        "loan account authority should be lender"
    );

    assert_eq!(
        loan_account.ltv_ratio, ltv_ratio,
        "loan account ltv ratio should be equal to ltv ratio"
    );

    assert_eq!(
        loan_account.duration, loan_duration,
        "loan account duration should be equal to loan duration"
    );

    assert_eq!(
        loan_account.loan_amount, loan_amount,
        "loan account loan amount should be equal to loan amount"
    );

    assert_eq!(
        loan_account.interest_rate, interest_rate,
        "loan account interest rate should be equal to loan interest rate"
    );
}

// #[ignore = ""]
#[tokio::test]
async fn test_peer_protocol_borrow_spl() {
    let SetupTest {
        validator,
        admin,
        users,
        mint_a,
        protocol,
        ..
    } = SetupTest::new();

    let mut context = validator.start_with_context().await;
    let lender = &users[0];
    let borrower = &users[1];
    let token_amount = 1000;
    let deposit_amount = 100;
    let loan_duration = 1000;
    let interest_rate = 5;
    let loan_amount = 50;
    let ltv_ratio = 50;

    utils::init_protocol(&mut context, &admin, &protocol).await;
    utils::init_user(&mut context, lender, &protocol).await;
    utils::init_user(&mut context, borrower, &protocol).await;

    helpers::create_spl_token(&mut context, &admin, &mint_a, 9).await;
    helpers::init_ata_mint(
        &mut context,
        &admin,
        &lender.user_keypair,
        &lender.mint_a_ata,
        &mint_a.pubkey(),
        token_amount,
    )
    .await;

    utils::init_asset(&mut context, &admin, mint_a.pubkey(), protocol.pubkey()).await;
    utils::deposit_spl(
        &mut context,
        lender,
        mint_a.pubkey(),
        protocol.pubkey(),
        deposit_amount,
    )
    .await;

    let loan = utils::create_loan_spl(
        &mut context,
        lender,
        protocol.pubkey(),
        mint_a.pubkey(),
        loan_duration,
        interest_rate,
        loan_amount,
        ltv_ratio,
    )
    .await;

    utils::borrow_spl(
        &mut context,
        borrower,
        protocol.pubkey(),
        loan,
        mint_a.pubkey(),
    )
    .await;

    let borrower_user_profile_ata =
        get_associated_token_address(&borrower.user_profile_pda, &mint_a.pubkey());

    let borrower_user_profile_ata_account: TokenAccount =
        helpers::load_and_deserialize(&mut context, borrower_user_profile_ata).await;

    assert_eq!(
        borrower_user_profile_ata_account.amount, loan_amount,
        "borrower user profile ata amount should be equal to loan amount"
    );
}

#[tokio::test]
async fn test_peer_protocol_repay_sol() {}

#[tokio::test]
async fn test_peer_protocol_repay_spl() {}

#[tokio::test]
async fn test_peer_protocol_close_loan() {}
