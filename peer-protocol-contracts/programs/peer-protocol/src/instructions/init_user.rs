use crate::accounts_ix::init_user::*;
use anchor_lang::prelude::*;

pub fn init_user(ctx: Context<InitUser>) -> Result<()> {
    let user_deposit_account = &mut ctx.accounts.user_profile;
    let user = &mut ctx.accounts.authority;
    let bump = ctx.bumps.user_profile;

    user_deposit_account.init(user.key(), bump)?;

    msg!(
        "User deposit initialized: {:#?}",
        user_deposit_account.key()
    );

    Ok(())
}
