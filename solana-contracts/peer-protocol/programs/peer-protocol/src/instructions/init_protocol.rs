use crate::accounts_ix::init_protocol::*;
use anchor_lang::prelude::*;

pub fn init_protocol(ctx: Context<InitProtocol>) -> Result<()> {
    let protocol = &mut ctx.accounts.protocol;

    protocol.init()?;

    Ok(())
}
