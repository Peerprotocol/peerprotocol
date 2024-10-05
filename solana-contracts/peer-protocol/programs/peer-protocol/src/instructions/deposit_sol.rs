use crate::accounts_ix::deposit_sol::*;
use anchor_lang::prelude::*;

pub fn deposit_sol(ctx: Context<DepositSol>, amount: u64) -> Result<()> {
    let user = &ctx.accounts.authority;
    let user_pda = &ctx.accounts.user_profile;

    
    let ix = anchor_lang::solana_program::system_instruction::transfer(
        &user.key(),
        &user_pda.key(),
        amount,
    );
    anchor_lang::solana_program::program::invoke(
        &ix,
        &[user.to_account_info(), user_pda.to_account_info()],
    )?;

    Ok(())
}
