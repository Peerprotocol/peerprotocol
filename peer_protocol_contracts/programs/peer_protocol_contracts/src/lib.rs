use anchor_lang::prelude::*;

declare_id!("CtSV2iydoLX9KRj4bxKRKhfWgwhJkghYg4y41EQAJZrg");

#[program]
pub mod peer_protocol_contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
    // lender creates a new loan with duration, interest rate, and collateral
    pub fn create_loan(
        ctx: Context<CreateLoan>,
        duration: i64,
        interest_rate: i64,
        collateral: i64,
    ) -> Result<()> {
        Ok(())
    }

    // accept loan
    pub fn accept_loan(ctx: Context<AcceptLoan>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct CreateLoan<'info> {
    #[account(init, payer = user, space = 8 + 8)]
    loan: ProgramAccount<'info, Loan>,
    rent: Sysvar<'info, Rent>,
}

#[account]
pub struct Loan {
    pub lender: Pubkey,
    pub duration: i64,
    pub interest_rate: i64,
    pub collateral: i64,
    pub borrower: Pubkey,
    pub amount: i64,
    pub status: LoanStatus,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub enum LoanStatus {
    Open,
    Closed,
}

#[derive(Accounts)]
pub struct AcceptLoan<'info> {
    #[account(mut)]
    loan: ProgramAccount<'info, Loan>,
    borrower: Signer<'info>,
}
