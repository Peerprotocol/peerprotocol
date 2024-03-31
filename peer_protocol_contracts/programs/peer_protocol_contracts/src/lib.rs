use anchor_lang::prelude::*;

declare_id!("CtSV2iydoLX9KRj4bxKRKhfWgwhJkghYg4y41EQAJZrg");

#[program]
pub mod peer_protocol_contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
