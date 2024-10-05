use crate::{accounts_ix::deposit_spl::*, helpers::spl_token_transfer};
use anchor_lang::prelude::*;

pub fn deposit_spl(ctx: Context<DepositSpl>, amount: u64) -> Result<()> {
    let user_ata = &mut ctx.accounts.user_ata;
    let token_program = &mut ctx.accounts.token_program;
    let authority = &mut ctx.accounts.authority;
    // let mint = &mut ctx.accounts.mint;
    // let user_profile = &mut ctx.accounts.user_profile;
    let user_profile_ata = &mut ctx.accounts.user_profile_ata;

    spl_token_transfer(
        user_ata,
        user_profile_ata,
        authority,
        token_program,
        amount,
        None,
    )?;
    Ok(())
}
