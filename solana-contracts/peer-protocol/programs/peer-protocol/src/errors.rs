use anchor_lang::error_code;

#[error_code]
pub enum PeerProtocolError {
    #[msg("Account is already initialized")]
    AccountInitialized,
    #[msg("Account not initialized")]
    AccountNotInitialized,
    #[msg("User profile is not initialized")]
    UserProfileNotInitialized,
    #[msg("Protocol is not initialized")]
    ProtocolNotInitialized,
    #[msg("Insufficient funds in the account.")]
    InsufficientFunds,
    #[msg("Not authorized")]
    NotAuthorized,
    #[msg("Offer already accepted")]
    OfferAlreadyAccepted,
    #[msg("Offer already expired")]
    LoanAlreadyAccepted,
    #[msg("Offer fulfilled")]
    LoanAlreadyFulfilled,
    #[msg("Asset already initialized")]
    AssetAlreadyInitialized,
}
