use crate::{
    accounts_ix::create_loan_spl::*, constants::USER_PROFILE_TAG, errors::PeerProtocolError,
    helpers::spl_token_transfer,
};
use anchor_lang::prelude::*;

pub fn create_loan_spl(
    ctx: Context<CreateLoanSpl>,
    ltv_ratio: u16,
    duration: i64,
    mint: Pubkey,
    loan_amount: u64,
    interest_rate: u16,
) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;
    let user_profile_ata = &mut ctx.accounts.user_profile_ata;
    let loan = &mut ctx.accounts.loan;
    let authority = &ctx.accounts.authority;
    let loan_ata = &ctx.accounts.loan_ata;
    let token_program = &ctx.accounts.token_program;
    let bump = ctx.bumps.loan;
    let user_profile_bal = user_profile_ata.amount;

    require!(
        user_profile_bal >= loan_amount,
        PeerProtocolError::InsufficientFunds
    );

    let authority_key = authority.key();
    let seeds = &[
        USER_PROFILE_TAG,
        authority_key.as_ref(),
        &[user_profile.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    spl_token_transfer(
        user_profile_ata,
        loan_ata,
        authority,
        token_program,
        loan_amount,
        Some(signer_seeds),
    )?;

    user_profile.increment_lending_count()?;

    loan.init(
        authority.key(),
        ltv_ratio,
        duration,
        mint,
        loan_amount,
        interest_rate,
        bump,
    )?;

    Ok(())
}
