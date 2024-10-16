use crate::{
    accounts_ix::create_loan_spl::*, constants::USER_PROFILE_TAG, errors::PeerProtocolError,
    helpers::spl_token_transfer,
};
use anchor_lang::prelude::*;

pub fn create_loan_spl(
    ctx: Context<CreateLoanSpl>,
    ltv_ratio: u8,
    duration: i64,
    loan_amount: u64,
    interest_rate: u8,
) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;
    let user_profile_ata = &mut ctx.accounts.user_profile_ata;
    let authority = &ctx.accounts.authority;
    let mint = &ctx.accounts.mint;

    msg!("Creating spl loan");

    require!(
        user_profile_ata.amount >= loan_amount,
        PeerProtocolError::InsufficientFunds
    );

    msg!("Passed amount check");

    let authority_key = authority.key();
    let seeds = &[
        USER_PROFILE_TAG,
        authority_key.as_ref(),
        &[user_profile.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    msg!("Transferring loan amount");

    spl_token_transfer(
        user_profile_ata,
        &ctx.accounts.loan_ata,
        &user_profile.to_account_info(),
        &ctx.accounts.token_program,
        loan_amount,
        Some(signer_seeds),
    )?;

    msg!("Incrementing lending count");

    user_profile.increment_lending_count()?;

    msg!("Initializing loan");

    ctx.accounts.loan.init(
        authority.key(),
        ltv_ratio,
        duration,
        mint.key(),
        loan_amount,
        interest_rate,
        user_profile.lending_count,
        ctx.bumps.loan,
    )?;

    msg!("Loan created");

    Ok(())
}
