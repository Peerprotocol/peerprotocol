use anchor_lang::prelude::*;

use crate::constants::USER_PROFILE_TAG;
use crate::errors::PeerProtocolError;
use crate::state::protocol::Protocol;
use crate::state::user_profile::UserProfile;

#[derive(Accounts)]
pub struct InitUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump,
        space = 8 + UserProfile::INIT_SPACE
    )]
    pub user_profile: Account<'info, UserProfile>,
    #[account(constraint = protocol.is_init == true @ PeerProtocolError::ProtocolNotInitialized)]
    pub protocol: Account<'info, Protocol>,
    pub system_program: Program<'info, System>,
}
