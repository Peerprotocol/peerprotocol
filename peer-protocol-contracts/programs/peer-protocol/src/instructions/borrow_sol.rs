use crate::{accounts_ix::borrow_sol::*, errors::PeerProtocolError};
use anchor_lang::prelude::*;

pub fn borrow_sol(ctx: Context<BorrowSol>, _loan_idx: u64) -> Result<()> {
    let loan = &mut ctx.accounts.loan;
    let borrower = &ctx.accounts.authority;

    require!(!loan.is_fulfilled, PeerProtocolError::LoanAlreadyFulfilled);
    require!(
        loan.is_accepted == false,
        PeerProtocolError::LoanAlreadyAccepted
    );

    loan.loan(borrower.key())?;
    loan.is_fulfilled = true;

    **borrower.to_account_info().try_borrow_mut_lamports()? += loan.loan_amount;
    **loan.to_account_info().try_borrow_mut_lamports()? -= loan.loan_amount;

    Ok(())
}
