use anchor_spl::associated_token::get_associated_token_address;
// use anchor_spl::token::spl_token;
use solana_program_test::ProgramTest;
use solana_sdk::{
    account::Account, native_token::LAMPORTS_PER_SOL, pubkey::Pubkey, signature::Keypair,
    signer::Signer,
};

use super::get_pda;
pub struct User {
    pub user_keypair: Keypair,
    pub user_profile_pda: Pubkey,
    pub user_profile_pda_bump: u8,
    pub mint_a_ata: Pubkey,
    pub mint_b_ata: Pubkey,
}

pub struct SetupTest {
    pub validator: ProgramTest,
    pub admin: Keypair,
    pub protocol: Keypair,
    pub users: Vec<User>,
    pub mint_a: Keypair,
    pub mint_b: Keypair,
}

impl SetupTest {
    pub fn new() -> Self {
        let mut validator = ProgramTest::new("peer_protocol", peer_protocol::ID, None);
        let admin = Keypair::new();
        let protocol = Keypair::new();
        let mint_a = Keypair::new();
        let mint_b = Keypair::new();
        let mut users = vec![];

        validator.add_account(
            admin.pubkey(),
            Account {
                lamports: 10 * LAMPORTS_PER_SOL,
                ..Account::default()
            },
        );

        for _ in 0..3 {
            let user_keypair = Keypair::new();
            let (user_profile_pda, user_profile_pda_bump) = get_pda(super::PdaType::UserProfile {
                key: user_keypair.pubkey(),
            });

            validator.add_account(
                user_keypair.pubkey(),
                Account {
                    lamports: 10 * LAMPORTS_PER_SOL,
                    ..Account::default()
                },
            );

            let mint_a_ata = get_associated_token_address(&user_keypair.pubkey(), &mint_a.pubkey());
            let mint_b_ata = get_associated_token_address(&user_keypair.pubkey(), &mint_b.pubkey());

            users.push(User {
                user_keypair,
                user_profile_pda,
                user_profile_pda_bump,
                mint_a_ata,
                mint_b_ata,
            });
        }

        SetupTest {
            validator,
            admin,
            protocol,
            users,
            mint_a,
            mint_b,
        }
    }
}
