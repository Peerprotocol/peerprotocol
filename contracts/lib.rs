use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer as SplTransfer};
use solana_program::system_instruction;
use solana_program::clock::UnixTimestamp;

pub mod constant;
pub mod error;
pub mod states;

use crate::{constant::*,error::*,states::*};

declare_id!("11111111111111111111111111111111")

#[program]
pub mod peer_protocol {
    use super::*;
    
    #[derive(Accounts)]
    pub struct TransferLamports<'info> {
        #[account(mut)]
        pub from: Signer<'info>,
        #[account(mut)]
        pub to: AccountInfo<'info>,
        pub system_program: Program<'info, System>,
    }

    pub fn transfer_lamports(ctx: Context<TransferLamports>, amount: u64) -> Result<()> {
        let from_account = &ctx.accounts.from;
        let to_account = &ctx.accounts.to;

        if from_account.lamports() < amount {
            return Err(ProgramError::InsufficientFunds);
        }

        // Create the transfer instruction
        let transfer_instruction = system_instruction::transfer(from_account.key, to_account.key, amount);

        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                from_account.to_account_info(),
                to_account.clone(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;

        Ok(())
    }

    #[derive(Accounts)]
    pub struct TransferSpl<'info> {
        pub from: Signer<'info>,
        #[account(mut)]
        pub from_ata: Account<'info, TokenAccount>,
        #[account(mut)]
        pub to_ata: Account<'info, TokenAccount>,
        pub token_program: Program<'info, Token>,
    }

    pub fn transfer_spl_tokens(ctx: Context<TransferSpl>, amount: u64) -> Result<()> {
        let destination = &ctx.accounts.to_ata;
        let source = &ctx.accounts.from_ata;
        let token_program = &ctx.accounts.token_program;
        let authority = &ctx.accounts.from;

        // Transfer tokens from taker to initializer
        let cpi_accounts = SplTransfer {
            from: source.to_account_info().clone(),
            to: destination.to_account_info().clone(),
            authority: authority.to_account_info().clone(),
        };
        let cpi_program = token_program.to_account_info();
        
        token::transfer(
            CpiContext::new(cpi_program, cpi_accounts),
            amount)?;
        Ok(())
    }

    #[derive(Accounts)]
    pub struct Lend<'info> {
        #[account(mut)]
        pub lender: Signer<'info>,
        #[account(mut)]
        pub lender_ata: Account<'info, TokenAccount>,
        #[account(mut)]
        pub borrower_ata: Account<'info, TokenAccount>,
        pub token_program: Program<'info, Token>,
        pub system_program: Program<'info, System>,
    }

    pub fn lend(
        ctx: Context<Lend>,
        amount: u64,
        duration: i64,
        interest_rate: f64,
        start_date: UnixTimestamp,
    ) -> Result<()> {
        // Perform lending operations here, such as transferring tokens, updating balances, etc.
       // implementing
    }
}
