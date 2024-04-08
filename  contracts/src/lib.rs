use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
pub mod constants;
pub mod states;
use pyth_sdk_solana::load_price_feed_from_account_info;
use std::str::FromStr;

declare_id!("3AcX1jZSe1emKRvkXaefBWGwUM2wGVJp1545TCXwJiyu");

use crate::{constants::*, states::*};

const BTC_USDC_FEED: &str = "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J";
const PYTH_USDC_FEED: &str = "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw";
const STALENESS_THRESHOLD: u64 = 60; // staleness threshold in seconds
#[program]
pub mod peer_protocol_contracts {
    use super::*;

    pub fn initialize(ctx: Context<InitializeUser>) -> Result<()> {
        // Initialize user profile with default data
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.loan_count = 0;
        user_profile.last_loan = 0;
        user_profile.can_borrow = true;
        user_profile.can_deposit = true;
        Ok(())
    }

    pub fn deposit_collaterial(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let token_program = &ctx.accounts.token_program;
        let authority = &ctx.accounts.authority;
        let user_profile = &mut ctx.accounts.user_profile;

        if !user_profile.can_deposit {
            // return Err(ProgramError::Custom(1)); // Replace 1 with appropriate error code
        }

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();

        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        user_profile.can_deposit = false;
        // fetch_collaterial_price();
        user_profile.total_deposit = user_profile.total_deposit.checked_add(amount).unwrap();

        Ok(())
    }

    // lender creates a new loan with duration, interest rate, and collateral
    pub fn create_loan(ctx: Context<CreateLoan>, duration: i64, interest_rate: f64) -> Result<()> {
        msg!("Creating loan");
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
    pub fn accept_loan(ctx: Context<AcceptLoan>, _loan_idx: u8, loan_amount: u64) -> Result<()> {
        let loan_account = &mut ctx.accounts.loan_account;
        let user_profile = &mut ctx.accounts.user_profile;
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let authority = &ctx.accounts.authority;

        if !user_profile.can_borrow {
            // return Err(ProgramError::Custom(1)); // Replace 1 with appropriate error code
        }

        // Check if the loan duration is valid
        if loan_account.duration <= 0 {
            // return Err(ProgramError::Custom(2)); // Replace 2 with appropriate error code
        }

        // Check if the interest rate is valid
        if loan_account.interest_rate <= 0.0 {
            // return Err(ProgramError::Custom(3)); // Replace 3 with appropriate error code
        }

        loan_account.status = LoanStatus::Closed;
        loan_account.borrower = ctx.accounts.authority.key();

        // Perform the token transfer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };

        let cpi_program = ctx.accounts.token_program.to_account_info();

        token::transfer(CpiContext::new(cpi_program, cpi_accounts), loan_amount)?;

        Ok(())
    }

    pub fn fetch_collaterial_price(ctx: Context<FetchCollaterialPrice>) -> Result<f64> {
        // 1-Fetch latest price
        let price_account_info = &ctx.accounts.price_feed;
        msg!("getting price feed");
        let price_feed = load_price_feed_from_account_info(&price_account_info).unwrap();
        let current_timestamp = Clock::get()?.unix_timestamp;
        msg!("gotten price feed");
        let current_price = price_feed
            .get_price_no_older_than(current_timestamp, STALENESS_THRESHOLD)
            .unwrap();
        msg!("{}", current_price.price);
        msg!("{:?}", current_price);
        // 2-Format display values rounded to nearest dollar
        let display_price = (u64::try_from(current_price.price).unwrap() as f64)
            / (10u64.pow(u32::try_from(-current_price.expo).unwrap()) as f64);

        let display_confidence = u64::try_from(current_price.conf).unwrap()
            / 10u64.pow(u32::try_from(-current_price.expo).unwrap());

        // // 3-Log result
        msg!("/USD price: ({} +- {})", display_price, display_confidence);
        Ok(display_price)
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
        init,
        payer = authority,
        seeds = [LOAN_TAG, authority.key().as_ref(),&[user_profile.last_loan as u8].as_ref()],
        bump,
        has_one = authority,
        space = 8 + std::mem::size_of::<Loan>()
    )]
    pub loan_account: Box<Account<'info, Loan>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub from_ata: Account<'info, TokenAccount>,
    #[account(mut)]
    pub to_ata: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
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
    #[account(mut,
    seeds = [LOAN_TAG,authority.key().as_ref(),&[loan_idx].as_ref()],
    bump,
    )]
    loan_account: Box<Account<'info, Loan>>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub from_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub to_ata: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
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

#[derive(Accounts)]
pub struct TransferSpl<'info> {
    pub authority: Signer<'info>,
    #[account(mut)]
    pub from_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub to_ata: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
}

#[derive(Accounts)]
pub struct FetchCollaterialPrice<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(mut)]
    pub price_feed: AccountInfo<'info>,
}

#[error_code]
pub enum FeedError {
    #[msg("Invalid Price Feed")]
    InvalidPriceFeed,
}
