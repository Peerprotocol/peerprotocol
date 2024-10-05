use anchor_lang::prelude::*;

use crate::errors::PeerProtocolError;

#[account]
#[derive(InitSpace)]
pub struct Protocol {
    pub is_init: bool,
    #[max_len(10)]
    pub whitelisted_mints: Vec<MintDetails>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Default, PartialEq, InitSpace)]
pub struct MintDetails {
    pub mint: Pubkey,
    pub decimals: u8,
}

impl Protocol {
    pub fn init(&mut self) -> Result<()> {
        require!(!self.is_init, PeerProtocolError::AccountInitialized);

        self.is_init = true;
        Ok(())
    }
}
