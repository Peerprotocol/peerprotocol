import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  // GlowWalletAdapter,
  PhantomWalletAdapter,
  CloverWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { ReactNode, createContext, useContext, useEffect } from "react";

import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Toaster } from "react-hot-toast";
import { programState } from "@/hooks/user_states";
import { init } from "next/dist/compiled/webpack/webpack";
import { UserContextValue } from "@/interface/program_interface";

interface WalletConnectProviderProps {
  children: any;
}

export const WalletConnectProvider = ({
  children,
}: WalletConnectProviderProps) => {
  let network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    return clusterApiUrl(network);
  }, [network]);

  // const wallets = [new PhantomWalletAdapter(), new CloverWalletAdapter()];
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new LedgerWalletAdapter(),
      // new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
      new TrustWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <Toaster />
      <WalletProvider
        wallets={wallets}
        autoConnect
        onError={(e) => console.log(e)}
      >
        <WalletModalProvider>
          <InnerProvider>{children}</InnerProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const defaultState: UserContextValue = {
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
export const UserContext = createContext<UserContextValue>(defaultState);
const InnerProvider = ({ children }: { children: ReactNode }) => {
  const state = programState();
  useEffect(() => {
    state.findProfileAccounts();
  }, [state.publicKey, state.program, state.Trxpend]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
