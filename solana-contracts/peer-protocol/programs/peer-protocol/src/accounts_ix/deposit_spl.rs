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
pub struct DepositSpl<'info> {
    #[account(mut, address = user_profile.authority)]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub user_ata: Account<'info, TokenAccount>,

    #[account(
        constraint = user_profile.is_init == true @ PeerProtocolError::UserProfileNotInitialized,
        mut,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,

    #[account(init_if_needed,
        payer = authority,
        associated_token::mint = mint,
        associated_token::authority = user_profile
    )]
    pub user_profile_ata: Account<'info, TokenAccount>,

    pub mint: Account<'info, Mint>,

    #[account(constraint = protocol.is_init == true @ PeerProtocolError::ProtocolNotInitialized)]
    pub protocol: Account<'info, Protocol>,

    pub token_program: Program<'info, Token>,

    pub associated_token_program: Program<'info, AssociatedToken>,

    pub system_program: Program<'info, System>,
}
