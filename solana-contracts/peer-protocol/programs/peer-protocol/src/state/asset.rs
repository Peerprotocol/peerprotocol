use anchor_lang::prelude::*;

use crate::errors::PeerProtocolError;

#[account]
#[derive(InitSpace)]
pub struct Asset {
    pub bump: u8,
    pub mint: Pubkey,
    pub is_initialized: bool,
    pub is_active: bool,
}

impl Asset {
    pub fn init(&mut self, bump: u8, mint: Pubkey) -> Result<()> {
        require!(
            !self.is_initialized,
            PeerProtocolError::AssetAlreadyInitialized
        );

        self.bump = bump;
        self.mint = mint;
        self.is_initialized = true;
        self.is_active = true;
        Ok(())
    }
}
