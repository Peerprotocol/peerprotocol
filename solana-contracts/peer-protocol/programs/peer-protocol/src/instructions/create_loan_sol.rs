use crate::accounts_ix::create_loan_sol::*;
use anchor_lang::prelude::*;

pub fn create_loan_sol(
    ctx: Context<CreateLoanSol>,
    ltv_ratio: u16,
    duration: i64,
    loan_amount: u64,
    interest_rate: u16,
) -> Result<()> {
    let user_profile = &mut ctx.accounts.user_profile;
    let loan = &mut ctx.accounts.loan;
    let authority = &ctx.accounts.authority;
    let bump = ctx.bumps.loan;

    **loan.to_account_info().try_borrow_mut_lamports()? += loan_amount;
    **authority.try_borrow_mut_lamports()? -= loan_amount;

    user_profile.increment_lending_count()?;

    loan.init(
        authority.key(),
        ltv_ratio,
        duration,
        loan_amount,
        interest_rate,
        bump,
    )?;

    Ok(())
}
