use anchor_lang::prelude::*;

use crate::errors::PeerProtocolError;

#[account]
#[derive(InitSpace)]
pub struct LoanSpl {
    pub is_init: bool,
    pub lender: Pubkey,
    pub ltv_ratio: u16,
    pub duration: i64,
    pub mint: Pubkey,
    pub loan_amount: u64,
    pub interest_rate: u16,
    pub bump: u8,
    pub borrower: Option<Pubkey>,
    pub is_accepted: bool,
    pub is_fulfilled: bool,
    pub is_liquidated: bool,
}

impl LoanSpl {
    pub fn init(
        &mut self,
        lender: Pubkey,
        ltv_ratio: u16,
        duration: i64,
        mint: Pubkey,
        loan_amount: u64,
        interest_rate: u16,
        bump: u8,
    ) -> Result<()> {
        require!(!self.is_init, PeerProtocolError::AccountInitialized);

        self.is_init = true;
        self.lender = lender;
        self.ltv_ratio = ltv_ratio;
        self.duration = duration;
        self.mint = mint;
        self.loan_amount = loan_amount;
        self.interest_rate = interest_rate;
        self.bump = bump;
        self.borrower = None;
        self.is_accepted = false;
        self.is_fulfilled = false;
        self.is_liquidated = false;

        Ok(())
    }

    pub fn accept_offer(&mut self, borrower: Pubkey) -> Result<()> {
        require!(!self.is_accepted, PeerProtocolError::OfferAlreadyAccepted);
        require!(
            self.borrower.is_none(),
            PeerProtocolError::OfferAlreadyAccepted
        );

        self.borrower = Some(borrower);
        self.is_accepted = true;

        Ok(())
    }
}
