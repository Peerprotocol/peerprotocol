use crate::errors::PeerProtocolError;
use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct LoanSol {
    pub is_init: bool,
    pub lender: Pubkey,
    pub ltv_ratio: u8,
    pub duration: i64,
    pub loan_amount: u64,
    pub interest_rate: u8,
    pub bump: u8,
    pub loan_idx: u64,
    pub borrower: Option<Pubkey>,
    pub is_accepted: bool,
    pub is_fulfilled: bool,
    pub is_liquidated: bool,
}

impl LoanSol {
    pub fn init(
        &mut self,
        lender: Pubkey,
        ltv_ratio: u8,
        duration: i64,
        loan_amount: u64,
        interest_rate: u8,
        loan_idx: u64,
        bump: u8,
    ) -> Result<()> {
        require!(!self.is_init, PeerProtocolError::AccountInitialized);

        self.is_init = true;
        self.lender = lender;
        self.ltv_ratio = ltv_ratio;
        self.duration = duration;
        self.loan_amount = loan_amount;
        self.interest_rate = interest_rate;
        self.bump = bump;
        self.loan_idx = loan_idx;
        self.borrower = None;
        self.is_accepted = false;
        self.is_fulfilled = false;
        self.is_liquidated = false;

        Ok(())
    }

    pub fn loan(&mut self, borrower: Pubkey) -> Result<()> {
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
