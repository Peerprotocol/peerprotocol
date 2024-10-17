use anchor_lang::prelude::*;

use crate::accounts_ix::init_asset::InitAsset;

pub fn init_asset(ctx: Context<InitAsset>) -> Result<()> {
    let asset = &mut ctx.accounts.asset;
    let bump = ctx.bumps.asset;
    let mint_key = ctx.accounts.mint.key();

    asset.init(bump, mint_key)?;
    Ok(())
}
