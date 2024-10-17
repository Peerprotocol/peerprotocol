use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::{
    constants::USER_PROFILE_TAG,
    errors::PeerProtocolError,
    state::{protocol::Protocol, user_profile::UserProfile},
};

#[derive(Accounts)]
pub struct WithdrawSpl<'info> {
    #[account(mut, address = user_profile.authority)]
    pub authority: Signer<'info>,

    // TODO: Should be init if needed
    #[account(
        init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = authority
    )]
    pub user_ata: Account<'info, TokenAccount>,

    #[account(
        constraint = user_profile.is_init
        @ PeerProtocolError::UserProfileNotInitialized,
        mut,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,

    #[account(mut)]
    pub user_profile_ata: Account<'info, TokenAccount>,

    pub mint: Account<'info, Mint>,

    #[account(
        constraint = protocol.is_init
        @ PeerProtocolError::ProtocolNotInitialized
    )]
    pub protocol: Account<'info, Protocol>,

    pub token_program: Program<'info, Token>,

    pub system_program: Program<'info, System>,

    pub associated_token_program: Program<'info, AssociatedToken>,
}
