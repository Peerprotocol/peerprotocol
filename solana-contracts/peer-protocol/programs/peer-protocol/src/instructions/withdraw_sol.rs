use crate::{accounts_ix::withdraw_sol::*, errors::PeerProtocolError};
use anchor_lang::prelude::*;

pub fn withdraw_sol(ctx: Context<WithdrawSol>, amount: u64) -> Result<()> {
    let user = &ctx.accounts.authority;
    let user_pda = &mut ctx.accounts.user_profile;

    if user_pda.get_lamports() < amount {
        return Err(PeerProtocolError::InsufficientFunds.into());
    }

    **user_pda.to_account_info().try_borrow_mut_lamports()? -= amount;
    **user.to_account_info().try_borrow_mut_lamports()? += amount;

    Ok(())
}
