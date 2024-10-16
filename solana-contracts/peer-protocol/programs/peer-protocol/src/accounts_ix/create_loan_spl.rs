use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

use crate::{
    constants::{LOAN_OFFER_TAG, USER_PROFILE_TAG},
    errors::PeerProtocolError,
    state::{loan_spl::LoanSpl, protocol::Protocol, user_profile::UserProfile},
};

#[derive(Accounts)]
pub struct CreateLoanSpl<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(init,
        payer = authority,
        space = 8 + LoanSpl::INIT_SPACE,
        seeds = [
            LOAN_OFFER_TAG,
            authority.key().as_ref(),
            (user_profile.lending_count + 1).
            to_le_bytes().
            as_ref()
            ],
        bump
    )]
    pub loan: Box<Account<'info, LoanSpl>>,

    #[account(
        constraint = user_profile.is_init
        @ PeerProtocolError::UserProfileNotInitialized,
        mut,
        seeds = [USER_PROFILE_TAG, authority.key().as_ref()],
        bump
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        constraint = protocol.is_init
        @ PeerProtocolError::ProtocolNotInitialized
    )]
    pub protocol: Box<Account<'info, Protocol>>,

    #[account(init_if_needed, payer = authority, associated_token::authority = loan, associated_token::mint = mint)]
    pub loan_ata: Box<Account<'info, TokenAccount>>,

    #[account(init_if_needed, payer = authority, associated_token::authority = user_profile, associated_token::mint = mint)]
    pub user_profile_ata: Box<Account<'info, TokenAccount>>,

    pub mint: Box<Account<'info, Mint>>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
