use anchor_lang::prelude::*;
use pyth_sdk_solana::load_price_feed_from_account_info;
use solana_program::pubkey;

declare_id!("6kyAE2eHjdiupYVp9Qs6pjbq8Frk7G5deLAaW8tEtEBu");
// const PYTH_USDC_FEED: &str = "EdVCmQ9FSPcVe5YySXDPCRmc8aDQLKJ9xvYBMZPie1Vw";
const STALENESS_THRESHOLD: u64 = 60; // staleness threshold in seconds

pub fn fetch_collaterial_price(price_feed: &AccountInfo) -> Result<f64> {
    msg!("getting price feed");
    let price_feed = load_price_feed_from_account_info(&price_feed).unwrap();
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
