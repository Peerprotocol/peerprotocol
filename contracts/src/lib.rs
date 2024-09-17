use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
pub mod constants;
pub mod helper;
pub mod states;
use solana_program::pubkey;
use std::str::FromStr;

declare_id!("6kyAE2eHjdiupYVp9Qs6pjbq8Frk7G5deLAaW8tEtEBu");

use crate::{constants::*, states::*};
const ADMIN_PUBKEY: Pubkey = pubkey!("7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk");

#[program]
pub mod peer_protocol_contracts {
    use super::*;
    use crate::helper::fetch_collaterial_price;

    pub fn initialize(ctx: Context<InitializeUser>) -> Result<()> {
        // Initialize user profile with default data
        let user_profile = &mut ctx.accounts.user_profile; // pool.mint = usdc_mint_pubkey; // pool.mint = usdc_mint_pubkey;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.loan_count = 0;
        user_profile.last_loan = 0;
        user_profile.can_borrow = true;
        user_profile.can_deposit = true;
        user_profile.coins_lent = vec![];
        user_profile.coins_deposited = vec![];
        Ok(())
    }
    // pub fn close_account(_ctx: Context<DeleteUser>) -> Result<()> {
    //     Ok(())
    // }

    pub fn initialize_admin(ctx: Context<InitializeAdmin>) -> Result<()> {
        // Initialize admin profile with default data
        let admin_profile = &mut ctx.accounts.admin_profile; // pool.mint = usdc_mint_pubkey; // pool.mint = usdc_mint_pubkey;
        admin_profile.authority = ctx.accounts.authority.key();
        admin_profile.collaterial_count = 0;
        Ok(())
    }

    pub fn add_accepted_collaterial(
        ctx: Context<AddAcceptedCollaterial>,
        ticker: String,
        mint_address: String,
        pool_address: String,
        image: String,
    ) -> Result<()> {
        let accepted_collaterial = &mut ctx.accounts.accepted_collaterial;
        let admin_profile = &mut ctx.accounts.admin_profile;
        accepted_collaterial.ticker = ticker;
        accepted_collaterial.mint_address = mint_address;
        accepted_collaterial.pool_address = pool_address;
        accepted_collaterial.image = image;
        admin_profile.collaterial_count = admin_profile.collaterial_count.checked_add(1).unwrap();
        accepted_collaterial.authority = ctx.accounts.authority.key();

        Ok(())
    }

    pub fn remove_accepted_collaterial(_ctx: Context<RemoveAcceptedCollaterial>) -> Result<()> {
        Ok(())
    }

    // pub fn total_deposit() -> f64 {

    // }

    pub fn deposit_collaterial(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let token_program = &ctx.accounts.token_program;
        let authority = &ctx.accounts.authority;
        let user_profile = &mut ctx.accounts.user_profile;
        let accepted_collaterial = &mut ctx.accounts.accepted_collaterial;

        require!(user_profile.can_deposit, ProgramError::UserCannotDeposit);

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();

        let collateral = DepositedColleterial {
            ticker: accepted_collaterial.ticker.clone(),
            mint_address: accepted_collaterial.mint_address.clone(),
            pool_address: accepted_collaterial.pool_address.clone(),
            image: accepted_collaterial.image.clone(),
            admin_ata: accepted_collaterial.admin_ata.clone(),
            admin_ata_pda: accepted_collaterial.admin_ata_pda.clone(),
            authority: accepted_collaterial.authority.clone(),
            decimals: accepted_collaterial.decimals.clone(),
            amount: amount,
        };

        // TODO: this way is not secure as the user can enter any mint address and claim to have deposited it.

        match user_profile
            .coins_deposited
            .iter_mut()
            .find(|c| c.mint_address == collateral.mint_address)
        {
            Some(existing_collateral) => {
                existing_collateral.amount += amount; // Update the amount
            }
            None => {
                // If the token doesn't exist in the list, add it as new collateral
                user_profile.coins_deposited.push(collateral);
            }
        }

        token::transfer(CpiContext::new(cpi_program, cpi_accounts), amount)?;

        // user_profile.can_deposit = false;
        // let currentPriceInUsd: f64 = fetch_collaterial_price(price_feed).unwrap();
        // update user balance for that coin

        Ok(())
    }

    pub fn withdraw_collaterial(ctx: Context<WithdrawSpl>, amount: u64) -> Result<()> {
        let creatorKey = Pubkey::from_str("7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk")
            .expect("Failed to parse public key string");
        let accepted_collaterial = &mut ctx.accounts.accepted_collaterial;

        let user_profile = &mut ctx.accounts.user_profile;

        let auth_bump: u8 = 254;
        let bump_vector = auth_bump.to_le_bytes();
        let seeds = &[
            ATA_PAY_TAG.as_ref(),
            creatorKey.as_ref(),
            bump_vector.as_ref(),
        ];
        let signer = &[&seeds[..]];

        match user_profile
            .coins_deposited
            .iter_mut()
            .find(|c| c.mint_address == accepted_collaterial.mint_address)
        {
            Some(existing_collateral) => {
                existing_collateral.amount -= amount; // Update the amount
            }
            None => {}
        }

        // Transfer tokens from taker to initializer
        // TODO: ctx.accounts.to_ata -> derive it from user pubkey
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
        // update user balance for that coin

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

        require!(
            loan_account.duration < ninetyDays,
            ProgramError::LoanDurationTooMuch
        );

        loan_account.interest_rate = interest_rate;
        loan_account.lender = user_profile.authority;
        loan_account.amount = amount;
        loan_account.status = LoanStatus::Open;
        loan_account.duration = duration;
        loan_account.authority = ctx.accounts.authority.key();
        loan_account.idx = user_profile.last_loan;
        // user_profile.total_deposit = user_profile
        //     .total_deposit
        //     .checked_sub(loan_account.amount)
        //     .unwrap();
        // user_profile.total_lent = user_profile
        //     .total_lent
        //     .checked_add(loan_account.amount)
        // .unwrap();

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

        require!(user_profile.can_borrow, ProgramError::UserCannotBorrow);
        require!(
            loan_account.duration > 0,
            ProgramError::LoanDurationTooSmall
        );
        require!(
            loan_account.interest_rate > 0.0,
            ProgramError::InterestTooSmall
        );

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

    pub fn remove_loan(ctx: Context<RemoveLoan>, collaterial_idx: u8) -> Result<()> {
        let user_profile = &mut ctx.accounts.user_profile;
        let loan_account = &mut ctx.accounts.loan_account;
        require!(
            loan_account.status == LoanStatus::Open,
            ProgramError::LoanAcceptedByNow
        );
        // user_profile.total_deposit = user_profile
        //     .total_deposit
        //     .checked_add(loan_account.amount)
        //     .unwrap();
        // user_profile.total_lent = user_profile
        //     .total_lent
        //     .checked_sub(loan_account.amount)
        //     .unwrap();

        // // Increase todo idx for ata_pda_authority
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
        seeds = [USER_TAG,authority.key.as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>()
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
#[instruction()]
pub struct DeleteUser<'info> {
    #[account(
        mut,
        close = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut, address = ADMIN_PUBKEY)]
    pub authority: Signer<'info>,

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
#[instruction()]
pub struct CloseUserProfile<'info> {
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority,
        close = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(mut)]
    pub authority: Signer<'info>,

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
    #[account(mut)] //TODO: add restriction here on account it can send to
    pub to_ata: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    pub price_feed: AccountInfo<'info>,
    #[account(
        mut,
        seeds = [USER_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    #[account(mut,has_one = authority,)]
    pub accepted_collaterial: Box<Account<'info, DepositedColleterial>>,
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
    #[account(mut,has_one = authority,)]
    pub accepted_collaterial: Box<Account<'info, DepositedColleterial>>,
}

#[error_code]
pub enum FeedError {
    #[msg("Invalid Price Feed")]
    InvalidPriceFeed,
}

#[error_code]
pub enum ProgramError {
    UserBalanceLessThanLending,
    UserCannotDeposit,
    UserCannotBorrow,
    LoanDurationTooMuch,
    LoanDurationTooSmall,
    InterestTooSmall,
    UserCannotWithdraw,
    LoanAcceptedByNow,
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeAdmin<'info> {
    #[account(
        mut,
        address = ADMIN_PUBKEY
    )]
    pub authority: Signer<'info>,
    #[account(
        init,
        payer = authority,
        seeds = [ADMIN_TAG,authority.key().as_ref()],
        bump,
        space = 8 + std::mem::size_of::<AdminProfile>()
    )]
    pub admin_profile: Box<Account<'info, AdminProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddAcceptedCollaterial<'info> {
    #[account(
        mut,
        address = ADMIN_PUBKEY
    )]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [ADMIN_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub admin_profile: Box<Account<'info, AdminProfile>>,

    #[account(
        init,
        payer = authority,
        seeds = [COLLATERIAL_TAG, authority.key().as_ref(),&[admin_profile.collaterial_count as u8].as_ref()],
        bump,
        space = 8 + std::mem::size_of::<AcceptedColleterial>()
        // has_one = authority
    )]
    pub accepted_collaterial: Box<Account<'info, AcceptedColleterial>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct RemoveAcceptedCollaterial<'info> {
    #[account(
        mut,
        address = ADMIN_PUBKEY
    )]
    pub authority: Signer<'info>,
    #[account(
        mut,
        close = authority,
        seeds = [COLLATERIAL_TAG, authority.key().as_ref(), &[admin_profile.collaterial_count as u8].as_ref()],
        bump,
        has_one = authority
    )]
    pub accepted_collaterial: Box<Account<'info, AcceptedColleterial>>,

    pub system_program: Program<'info, System>,
    #[account(
        mut,
        seeds = [ADMIN_TAG,authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub admin_profile: Box<Account<'info, AdminProfile>>,
}
