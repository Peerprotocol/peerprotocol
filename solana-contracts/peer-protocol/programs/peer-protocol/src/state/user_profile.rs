use anchor_lang::prelude::*;

use crate::errors::PeerProtocolError;

#[account]
#[derive(InitSpace)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub bump: u8,
    pub is_init: bool,
    pub lending_count: u64,
    pub borrowing_count: u64,
}

impl UserProfile {
    pub fn init(&mut self, authority: Pubkey, bump: u8) -> Result<()> {
        require!(!self.is_init, PeerProtocolError::AccountInitialized);

        self.authority = authority;
        self.bump = bump;
        self.is_init = true;
        self.lending_count = 0;
        self.borrowing_count = 0;
        Ok(())
    }

    pub fn increment_lending_count(&mut self) -> Result<()> {
        self.lending_count += 1;
        Ok(())
    }
}
