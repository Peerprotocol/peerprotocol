import { Program } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

export interface UserContextValue {
  initializeUser: () => void;
  setInitialized: (value: boolean) => void;
  Trxpend: boolean;
  initialized: boolean;
  loading: boolean;
  deposit: string;
  lent: string;
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
  ellipsify: (str: string, numCharacters: any) => string;
  withdrawCollaterial: (
    amount: number,
    token_public_key: string
  ) => Promise<void>;
  getTokenBalance: (mint_: any) => Promise<number | undefined>;
  publicKey: PublicKey | null;
  program: Program | undefined; // Replace with the actual type of your program
  userDebt: string;
  findProfileAccounts: () => Promise<void>;
}

export const defaultState: UserContextValue = {
  initializeUser: () => {},
  setInitialized: (value: boolean) => {},
  Trxpend: false,
  initialized: false,
  loading: false,
  deposit: "",
  lent: "",
  depositCollaterial: async (amount: number, token_public_key: string) => {},
  createLoan: async (
    duration: number,
    interest_rate: number,
    amount: number,
    mint_address: string
  ) => {},
  acceptLoan: async (
    loan_idx: number,
    loan_account: string,
    loan_owner_public_key: string,
    mint_address: string
  ) => {},
  loans: [],
  ellipsify: (str: string, numCharacters: any) => str,
  withdrawCollaterial: async (amount: number, token_public_key: string) => {},
  getTokenBalance: async (mint_: any) => undefined,
  publicKey: null,
  program: undefined,
  userDebt: "",
  findProfileAccounts: async () => {},
};
