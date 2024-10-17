use anchor_lang::prelude::*;

use crate::{
    constants::USER_PROFILE_TAG,
    errors::PeerProtocolError,
    state::{protocol::Protocol, user_profile::UserProfile},
};

#[derive(Accounts)]
pub struct DepositSol<'info> {
    #[account(mut, address = user_profile.authority)]
    pub authority: Signer<'info>,

    #[account(
        constraint = user_profile.is_init
        @ PeerProtocolError::UserProfileNotInitialized,
        mut,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,

    #[account(
        constraint = protocol.is_init
        @ PeerProtocolError::ProtocolNotInitialized
    )]
    pub protocol: Account<'info, Protocol>,

    pub system_program: Program<'info, System>,
}
