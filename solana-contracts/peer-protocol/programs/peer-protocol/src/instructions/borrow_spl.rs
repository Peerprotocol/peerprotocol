use crate::{accounts_ix::borrow_spl::*, constants::LOAN_OFFER_TAG, helpers::spl_token_transfer};
use anchor_lang::prelude::*;

pub fn borrow_spl(ctx: Context<BorrowSpl>, loan_idx: u64) -> Result<()> {
    // let user_profile = &mut ctx.accounts.user_profile;
    let user_profile_ata = &mut ctx.accounts.user_profile_ata;
    let loan = &mut ctx.accounts.loan;
    let loan_ata = &ctx.accounts.loan_ata;
    let token_program = &ctx.accounts.token_program;

    let authority_key = loan.lender;
    let loan_idx_seed = loan_idx.to_le_bytes();
    let seeds = &[
        LOAN_OFFER_TAG,
        authority_key.as_ref(),
        loan_idx_seed.as_ref(),
        &[loan.bump],
    ];
    let signer_seeds = &[&seeds[..]];

    spl_token_transfer(
        loan_ata,
        user_profile_ata,
        &loan.to_account_info(),
        token_program,
        loan.loan_amount,
        Some(signer_seeds),
    )?;
    Ok(())
}
