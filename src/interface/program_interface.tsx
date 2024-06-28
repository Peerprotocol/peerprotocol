import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface UserContextValue {
  initializeUser: () => void;
  setInitialized: (value: boolean) => void;
  transactionPending: boolean;
  initialized: boolean;
  loading: boolean;
  deposit: String;
  lent: String;
  depositCollaterial: (
    amount: number,
    token_public_key: string
  ) => Promise<void>;
  createLoan: (
    duration: number,
    interest_rate: number,
    amount: number,
    mint_address: string
  ) => Promise<void>;
  acceptLoan: (
    loan_idx: number,
    loan_account: string,
    loan_owner_public_key: string,
    mint_address: string
  ) => Promise<void>;
  loans: any[]; // Replace with actual type
  ellipsifyFirstLast: (str: String, numCharacters: any) => string | String;
  withdrawCollaterial: (
    amount: number,
    token_public_key: string
  ) => Promise<void>;
  getSplTokenBalance: (mint_: any) => Promise<number | undefined>;
  publicKey: PublicKey | null;
  program: Program | undefined; // Replace with the actual type of your program
  userDebt: string;
  findProfileAccounts: () => Promise<void>;
}
