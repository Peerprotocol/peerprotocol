use anchor_lang::prelude::*;

pub mod accounts_ix;
pub mod constants;
pub mod errors;
pub mod helpers;
pub mod instructions;
pub mod state;

use accounts_ix::{
    borrow_sol::*, borrow_spl::*, create_loan_sol::*, create_loan_spl::*, deposit_sol::*,
    deposit_spl::*, init_asset::*, init_protocol::*, init_user::*, withdraw_sol::*,
    withdraw_spl::*,
};

declare_id!("5zZPJxh95beuXBc6rY9ZkWCiGeuftFcoEbQ6KN4qbNNM");

#[program]
pub mod peer_protocol {
    use super::*;

    pub fn init_protocol(ctx: Context<InitProtocol>) -> Result<()> {
        instructions::init_protocol::init_protocol(ctx)?;
        Ok(())
    }

    pub fn init_user(ctx: Context<InitUser>) -> Result<()> {
        instructions::init_user::init_user(ctx)?;
        Ok(())
    }

    pub fn init_asset(ctx: Context<InitAsset>) -> Result<()> {
        instructions::init_asset::init_asset(ctx)?;
        Ok(())
    }

    pub fn deposit_sol(ctx: Context<DepositSol>, amount: u64) -> Result<()> {
        instructions::deposit_sol::deposit_sol(ctx, amount)?;
        Ok(())
    }

    pub fn deposit_spl(ctx: Context<DepositSpl>, amount: u64) -> Result<()> {
        instructions::deposit_spl::deposit_spl(ctx, amount)?;
        Ok(())
    }

    pub fn withdraw_sol(ctx: Context<WithdrawSol>, amount: u64) -> Result<()> {
        instructions::withdraw_sol::withdraw_sol(ctx, amount)?;
        Ok(())
    }

    pub fn withdraw_spl(ctx: Context<WithdrawSpl>, amount: u64) -> Result<()> {
        instructions::withdraw_spl::withdraw_spl(ctx, amount)?;
        Ok(())
    }

    pub fn create_loan_sol(
        ctx: Context<CreateLoanSol>,
        ltv_ratio: u8,
        duration: i64,
        loan_amount: u64,
        interest_rate: u8,
    ) -> Result<()> {
        instructions::create_loan_sol::create_loan_sol(
            ctx,
            ltv_ratio,
            duration,
            loan_amount,
            interest_rate,
        )?;
        Ok(())
    }

    pub fn create_loan_spl(
        ctx: Context<CreateLoanSpl>,
        ltv_ratio: u8,
        duration: i64,
        loan_amount: u64,
        interest_rate: u8,
    ) -> Result<()> {
        instructions::create_loan_spl::create_loan_spl(
            ctx,
            ltv_ratio,
            duration,
            loan_amount,
            interest_rate,
        )?;
        Ok(())
    }

    pub fn borrow_sol(ctx: Context<BorrowSol>, loan_idx: u64) -> Result<()> {
        instructions::borrow_sol::borrow_sol(ctx, loan_idx)?;
        Ok(())
    }

    pub fn borrow_spl(ctx: Context<BorrowSpl>, loan_idx: u64) -> Result<()> {
        instructions::borrow_spl::borrow_spl(ctx, loan_idx)?;
        Ok(())
    }
}
