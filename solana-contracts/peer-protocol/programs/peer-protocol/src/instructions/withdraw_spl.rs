use crate::{
    accounts_ix::withdraw_spl::*, constants::USER_PROFILE_TAG, helpers::spl_token_transfer,
};
use anchor_lang::prelude::*;

pub fn withdraw_spl(ctx: Context<WithdrawSpl>, amount: u64) -> Result<()> {
    let user_ata = &mut ctx.accounts.user_ata;
    let token_program = &mut ctx.accounts.token_program;
    let authority = &mut ctx.accounts.authority;
    // TODO: check this
    // let mint = &mut ctx.accounts.mint;
    let user_profile = &mut ctx.accounts.user_profile;
    let user_profile_ata = &mut ctx.accounts.user_profile_ata;

    // TODO: Validation

    let authority_key = authority.key();

    let seeds = [
        USER_PROFILE_TAG,
        authority_key.as_ref(),
        &[user_profile.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    spl_token_transfer(
        user_profile_ata,
        user_ata,
        &user_profile.to_account_info(),
        token_program,
        amount,
        Some(signer_seeds),
    )?;

    Ok(())
}
