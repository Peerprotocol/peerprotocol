use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct UserProfile {
    pub authority: Pubkey,
    pub last_loan: u8,
    pub loan_count: u8,
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

// impl Default for states::LoanStatus {
//     fn default() -> Self {
//         // Define the default value for LoanStatus here
//         LoanStatus::Open
//     }
// }
