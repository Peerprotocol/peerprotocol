use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_loan: u64,
    pub loan_count: u64,
    pub can_borrow: bool,
    pub can_deposit: bool,
    pub total_deposit: u64,
    pub total_lent: u64,
}

#[account]
#[derive(Default)]
pub struct Loan {
    pub lender: Pubkey,
    pub idx: u8,
    pub duration: i64,
    pub interest_rate: f64,
    pub collateral: i64,
    pub borrower: Pubkey,
    pub amount: i64,
    pub status: LoanStatus,
    pub authority: Pubkey,
    pub token_program: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Copy, Clone, PartialEq, Eq)]
pub enum LoanStatus {
    Open,
    Closed,
}

impl Default for LoanStatus {
    fn default() -> Self {
        LoanStatus::Open
    }
}
