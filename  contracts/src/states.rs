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
    pub idx: u64,
    pub duration: u64,
    pub interest_rate: f64,
    pub collateral: u64,
    pub borrower: Pubkey,
    pub amount: u64,
    pub status: LoanStatus,
    pub authority: Pubkey,
    pub token_program: Pubkey,
}

#[account]
#[derive(Debug, Default)]
pub struct Pool {
    pub authority: Pubkey,
    pub vault: Pubkey,
    pub mint: Pubkey,
    pub bump: u8,
}

#[account]
#[derive(Debug, Default)]
pub struct AdminProfile {
    pub collaterial_count: u8,
    pub authority: Pubkey,
}

#[account]
#[derive(Debug, Default)]
pub struct AcceptedCalleterial {
    pub ticker: String,
    pub mint_address: String,
    pub pool_address: String,
    pub image: String,
    pub authority: Pubkey,
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
