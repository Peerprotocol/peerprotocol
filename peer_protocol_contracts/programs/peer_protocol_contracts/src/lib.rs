use anchor_lang::prelude::*;
pub mod constants;
pub mod states;

declare_id!("B4tFqnDzLvCfm9u4tKYotE8e5sTpfZpXxvATT1QmQc6W");

use crate::{constants::*, states::*};
#[program]
pub mod peer_protocol_contracts {
    use super::*;

    pub fn initialize(ctx: Context<InitializeUser>) -> Result<()> {
        // Initialize user profile with default data
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.loan_count = 0;
        user_profile.last_loan = 0;
        Ok(())
    }

    // lender creates a new loan with duration, interest rate, and collateral
    pub fn create_loan(ctx: Context<CreateLoan>, duration: i64, interest_rate: i64) -> Result<()> {
        let loan_account = &mut ctx.accounts.loan_account;
        let user_profile = &mut ctx.accounts.user_profile;

        loan_account.interest_rate = interest_rate;
        loan_account.lender = user_profile.authority;
        loan_account.status = LoanStatus::Open;
        loan_account.duration = duration;
        loan_account.authority = ctx.accounts.authority.key();

        // Increase todo idx for PDA
        user_profile.loan_count = user_profile.loan_count.checked_add(1).unwrap();

        // Increase total todo count
        user_profile.last_loan = user_profile.last_loan.checked_add(1).unwrap();

        Ok(())
    }

    // accept loan
    pub fn accept_loan(ctx: Context<AcceptLoan>, loan_idx: u8) -> Result<()> {
        let loan_account = &mut ctx.accounts.loan_account;
        let user_profile = &mut ctx.accounts.user_profile;

        loan_account.status = LoanStatus::Closed;
        loan_account.borrower = ctx.accounts.authority.key();
        Ok(())
    }

    // delete loan
    pub fn delete_loan(ctx: Context<RemoveLoan>, loan_idx: u8) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.loan_count = user_profile.loan_count.checked_sub(1).unwrap();
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>()
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct CreateLoan<'info> {
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub loan_account: Box<Account<'info, Loan>>,
    pub rent: Sysvar<'info, Rent>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(loan_idx:u8)]
pub struct AcceptLoan<'info> {
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut)]
    authority: Signer<'info>,
    #[account(mut,seeds = [LOAN_TAG,authority.key().as_ref(),&[loan_idx].as_ref()],
    bump,
    )]
    loan_account: Box<Account<'info, Loan>>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(loan_idx:u8)]
pub struct RemoveLoan<'info> {
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        close = authority,
        seeds = [LOAN_TAG, authority.key().as_ref(), &[loan_idx].as_ref()],
        bump,
        has_one = authority
    )]
    pub loan_account: Box<Account<'info, Loan>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
