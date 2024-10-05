use anchor_lang::prelude::*;

#[account]
pub struct LoanContract {
    pub borrower: Pubkey,
    pub lender: Pubkey,
    pub collateral_mint: Pubkey,
    pub collateral_amount: u64,
    pub loan_amount: u64,
    pub loan_token_mint: Pubkey,
    pub interest_rate: u16,
    pub duration: i64,
    pub ltv_ratio: u16,
    pub offer_created_at: i64,
    pub offer_expires_at: i64,
    pub is_fulfilled: bool,
    pub is_liquidated: bool,
    pub collateral_returned: bool,
}
