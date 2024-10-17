use anchor_lang::prelude::*;
use anchor_spl::token::Mint;

use crate::{
    constants::ASSET_TAG,
    errors::PeerProtocolError,
    state::{asset::Asset, protocol::Protocol},
};

#[derive(Accounts)]
pub struct InitAsset<'info> {
    #[account(
        init,
        payer = admin,
        seeds = [ASSET_TAG, mint.key().as_ref()],
        bump,
        space = 8 + Asset::INIT_SPACE
    )]
    pub asset: Account<'info, Asset>,

    #[account(mut)]
    pub admin: Signer<'info>,

    #[account(
        constraint = protocol.is_init
        @ PeerProtocolError::ProtocolNotInitialized
    )]
    pub protocol: Account<'info, Protocol>,

    pub mint: Account<'info, Mint>,
    pub system_program: Program<'info, System>,
}
