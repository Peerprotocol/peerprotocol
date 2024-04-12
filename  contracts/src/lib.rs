use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
pub mod constants;
pub mod states;
use anchor_spl::associated_token::{self, AssociatedToken, Create};
use anchor_spl::token::Mint;
use pyth_sdk_solana::load_price_feed_from_account_info;
use solana_program::pubkey;
use std::str::FromStr;

declare_id!("6kyAE2eHjdiupYVp9Qs6pjbq8Frk7G5deLAaW8tEtEBu");

use crate::{constants::*, states::*};
const adminKey: Pubkey = pubkey!("7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk");

const BTC_USDC_FEED: &str = "HovQMDrbAgAYPCmHVSrezcSmkMtXSSUsLDFANExrZh2J";
// const PYTH_USDC_FEED: &str = "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw";
const STALENESS_THRESHOLD: u64 = 60; // staleness threshold in seconds
#[program]
pub mod peer_protocol_contracts {
    use super::*;

    pub fn initialize(ctx: Context<InitializeUser>) -> Result<()> {
        // Initialize user profile with default data
        let user_profile = &mut ctx.accounts.user_profile;
        // let pool = &mut ctx.accounts.pool;
        let usdc_mint_pubkey_str = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU";
        let usdc_mint_pubkey =
            Pubkey::from_str(usdc_mint_pubkey_str).expect("Failed to parse public key string"); // Handle potential parsing errors
                                                                                                // pool.mint = usdc_mint_pubkey; // pool.mint = usdc_mint_pubkey;
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
            panic!("{:?}", ProgramError::USER_CANNOT_DEPOSIT); // Replace 1 with appropriate error code
        }

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();

        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        // user_profile.can_deposit = false;
        // fetch_collaterial_price();
        user_profile.total_deposit = user_profile.total_deposit.checked_add(amount).unwrap();

        Ok(())
    }

    pub fn withdraw_collaterial(ctx: Context<WithdrawSpl>, amount: u64) -> Result<()> {
        let creatorKey = Pubkey::from_str("7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk")
            .expect("Failed to parse public key string");
        let user_profile = &mut ctx.accounts.user_profile;

        let auth_bump: u8 = 254;
        let bump_vector = auth_bump.to_le_bytes();
        let seeds = &[
            ATA_PAY_TAG.as_ref(),
            creatorKey.as_ref(),
            bump_vector.as_ref(),
        ];
        let signer = &[&seeds[..]];

        // Transfer tokens from taker to initializer
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                SplTransfer {
                    from: ctx.accounts.from_ata.to_account_info(),
                    to: ctx.accounts.to_ata.to_account_info().clone(),
                    authority: ctx.accounts.ata_pda_authority.to_account_info(),
                },
                signer,
            ),
            amount, // Transfer all tokens from ata_pda_authority
        )?;

        // user_profile.can_deposit = false;
        // fetch_collaterial_price();
        user_profile.total_deposit = user_profile.total_deposit.checked_sub(amount).unwrap();

        Ok(())
    }

    // lender creates a new loan with duration, interest rate, and collateral
    pub fn create_loan(
        ctx: Context<CreateLoan>,
        duration: u64,
        interest_rate: f64,
        amount: u64,
    ) -> Result<()> {
        msg!("Creating loan");
        let loan_account = &mut ctx.accounts.loan_account;
        let user_profile = &mut ctx.accounts.user_profile;
        let ninetyDays = 90 * 24 * 60 * 60;
        if (loan_account.duration > ninetyDays) {
            panic!("{:?}", ProgramError::LOAN_DURATION_TOO_MUCH);
        }

        loan_account.interest_rate = interest_rate;
        loan_account.lender = user_profile.authority;
        loan_account.amount = amount;
        loan_account.status = LoanStatus::Open;
        loan_account.duration = duration;
        loan_account.authority = ctx.accounts.authority.key();
        user_profile.total_deposit = user_profile
            .total_deposit
            .checked_sub(loan_account.amount)
            .unwrap();
        user_profile.total_lent = user_profile
            .total_lent
            .checked_add(loan_account.amount)
            .unwrap();

        // // Increase todo idx for ata_pda_authority
        user_profile.loan_count = user_profile.loan_count.checked_add(1).unwrap();

        // // Increase total todo count
        user_profile.last_loan = user_profile.last_loan.checked_add(1).unwrap();

        Ok(())
    }

    pub fn accept_loan(ctx: Context<AcceptLoan>, loan_idx: u8) -> Result<()> {
        let creatorKey = Pubkey::from_str("7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk")
            .expect("Failed to parse public key string");

        let auth_bump: u8 = 254;
        let bump_vector = auth_bump.to_le_bytes();
        let seeds = &[
            ATA_PAY_TAG.as_ref(),
            creatorKey.as_ref(),
            bump_vector.as_ref(),
        ];
        let signer = &[&seeds[..]];
        let loan_account = &mut ctx.accounts.loan_account;
        let destination = &ctx.accounts.to_ata;
        loan_account.borrower = ctx.accounts.authority.key();
        let user_profile = &mut ctx.accounts.user_profile;

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

        msg!("{:?}", signer);
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                SplTransfer {
                    from: ctx.accounts.from_ata.to_account_info(),
                    to: destination.to_account_info().clone(),
                    authority: ctx.accounts.ata_pda_authority.to_account_info(),
                },
                signer,
            ),
            loan_account.amount, // Transfer all tokens from ata_pda_authority
        )?;

        loan_account.status = LoanStatus::Closed;
        loan_account.borrower = ctx.accounts.authority.key();
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

    pub fn remove_loan(ctx: Context<RemoveLoan>, loan_idx: u8) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let loan_account = &mut ctx.accounts.loan_account;
        user_profile.total_deposit = user_profile
            .total_deposit
            .checked_add(loan_account.amount)
            .unwrap();
        user_profile.total_lent = user_profile
            .total_lent
            .checked_sub(loan_account.amount)
            .unwrap();

        // // Increase todo idx for ata_pda_authority
        user_profile.loan_count = user_profile.loan_count.checked_sub(1).unwrap();

        // // Increase total todo count
        user_profile.last_loan = user_profile.last_loan.checked_sub(1).unwrap();
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
        seeds = [USER_TAG,authority.key.as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>()
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]

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
        space = 8 + std::mem::size_of::<Loan>()
    )]
    pub loan_account: Box<Account<'info, Loan>>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
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
    #[account(mut)]
    loan_account: Box<Account<'info, Loan>>,
    pub system_program: Program<'info, System>,
    #[account(mut)]
    pub from_ata: Box<Account<'info, TokenAccount>>,
    #[account(mut)]
    pub to_ata: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    #[account(mut)]
    pub ata_pda_authority: AccountInfo<'info>,
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
        // has_one = authority
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
pub struct WithdrawSpl<'info> {
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
    #[account(mut)]
    pub ata_pda_authority: AccountInfo<'info>,
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

#[derive(Debug)]
pub enum ProgramError {
    USER_BALANCE_LESS_THAN_LENDING,
    USER_CANNOT_DEPOSIT,
    LOAN_DURATION_TOO_MUCH,
    USER_CANNOT_WITHDRAW,
}
