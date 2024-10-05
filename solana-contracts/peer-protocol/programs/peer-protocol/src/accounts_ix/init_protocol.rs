use anchor_lang::prelude::*;

use crate::state::protocol::Protocol;

#[derive(Accounts)]
pub struct InitProtocol<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init, payer = authority, space = 8 + Protocol::INIT_SPACE)]
    pub protocol: Account<'info, Protocol>,

    pub system_program: Program<'info, System>,
}
