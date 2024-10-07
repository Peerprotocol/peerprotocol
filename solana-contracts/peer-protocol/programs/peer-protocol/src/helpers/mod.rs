use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

pub fn spl_token_transfer<'info>(
    from: &Account<'info, TokenAccount>,
    to: &Account<'info, TokenAccount>,
    authority: &AccountInfo<'info>,
    token_program: &Program<'info, Token>,
    amount: u64,
    signer_seeds: Option<&[&[&[u8]]]>,
) -> Result<()> {
    let cpi_accounts = Transfer {
        from: from.to_account_info(),
        to: to.to_account_info(),
        authority: authority.clone(),
    };

    let cpi_ctx = if let Some(seeds) = signer_seeds {
        CpiContext::new_with_signer(token_program.to_account_info(), cpi_accounts, seeds)
    } else {
        CpiContext::new(token_program.to_account_info(), cpi_accounts)
    };

    token::transfer(cpi_ctx, amount)?;

    Ok(())
}
