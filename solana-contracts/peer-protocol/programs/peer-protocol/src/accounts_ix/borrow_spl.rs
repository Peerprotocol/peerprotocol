use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};

use crate::{
    constants::{LOAN_OFFER_TAG, USER_PROFILE_TAG},
    errors::PeerProtocolError,
    state::{loan_spl::LoanSpl, user_profile::UserProfile},
};

#[derive(Accounts)]
pub struct BorrowSpl<'info> {
    // TODO: check security
    /// CHECK: insecure
    #[account(mut)]
    pub authority: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [
            LOAN_OFFER_TAG,
            authority.key().as_ref(),
            (user_profile.lending_count + 1).
            to_le_bytes().
            as_ref()
            ],
        bump
    )]
    pub loan: Account<'info, LoanSpl>,
    #[account(
        constraint = user_profile.is_init == true @ PeerProtocolError::UserProfileNotInitialized,
        mut,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump
    )]
    pub user_profile: Account<'info, UserProfile>,
    pub loan_ata: Account<'info, TokenAccount>,
    pub user_profile_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}
