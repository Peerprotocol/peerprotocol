import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
  useAnchorWallet,
  useConnection,
  useWallet,
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
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Toaster } from "react-hot-toast";
import { init } from "next/dist/compiled/webpack/webpack";
import * as anchor from "@project-serum/anchor";
import { PEER_PROTOCOL_PROGRAM_PUBKEY } from "../constants";
import peerIDL from "../constants/idl.json";
import toast from "react-hot-toast";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";

import { BN } from "@project-serum/anchor";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { UserContextValue } from "../interface/program_interface";
import { Coin } from "@/constants/coins";

interface WalletConnectProviderProps {
  children: any;
}

export const WalletConnectProvider = ({
  children,
}: WalletConnectProviderProps) => {
  let network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => {
    return "http://127.0.0.1:8899";
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
  depositCollaterial: async (amount: number, token_details: Coin) => {},
  createLoan: async (
    duration: number,
    interest_rate: number,
    amount: number,
    token_details: Coin
  ) => {},
  acceptLoan: async (
    loan_idx: number,
    loan_account: string,
    loan_owner_public_key: string,
    token_details: Coin
  ) => {},
  availableLoans: [],
  ellipsify: (str: string, numCharacters: any) => str,
  withdrawCollaterial: async (amount: number, token_details: Coin) => {},
  getTokenBalance: async (mint_: Coin) => undefined,
  publicKey: null,
  program: undefined,
  userDebt: "",
  findProfileAccounts: async () => {},
};
export const UserContext = createContext<UserContextValue>(defaultState);
const InnerProvider = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const { sendTransaction, publicKey, signTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [deposit, setTotalDeposit] = useState("");
  const [lent, setTotalLending] = useState("");
  const [availableLoans, setAvailableLoans] = useState([]);
  const [userDebt, setUserDebt] = useState("");
  const [lastLoan, setLastLoan] = useState(0);

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Trxpend, setTrxPend] = useState(false);
  function programState(): UserContextValue {
    function ellipsify(str: string, numCharacters: any): string {
      if (str.length <= numCharacters * 2) {
        return str;
      } else {
        const firstPart = str.substring(0, numCharacters);
        const lastPart = str.substring(str.length - numCharacters);
        return firstPart + "..." + lastPart;
      }
    }

    const initializeUser = async () => {
      // Check if the program exist and wallet is connected
      // then run InitializeUser() from smart contract
      if (program && publicKey) {
        try {
          setTrxPend(true);
          const [profilePda, profileBump] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );
          const tx = await program.methods
            .initialize()
            .accounts({
              userProfile: profilePda,
              systemProgram: SystemProgram.programId,
              authority: publicKey,
              pool: new PublicKey(
                "9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"
              ),
            })
            .rpc();
          toast.success("Successfully Intialized");

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };

    const createLoan = async (
      duration: number,
      interest_rate: number,
      amount: number
    ) => {
      if (+amount < 0) return;
      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();

          setTrxPend(true);
          const [profilePda, _] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const transferAmount = new BN(Math.trunc(amount * 10 ** 6));
          const [loanPda, loanBump] = findProgramAddressSync(
            [
              utf8.encode("LOAN_STATE"),
              publicKey.toBuffer(),
              Uint8Array.from([lastLoan]),
            ],
            program.programId
          );
          const txHash = await program.methods
            .createLoan(new BN(duration), interest_rate, transferAmount)
            .accounts({
              tokenProgram: TOKEN_PROGRAM_ID,
              userProfile: profilePda,
              loanAccount: loanPda,
              systemProgram: new PublicKey("11111111111111111111111111111111"),
              authority: publicKey,
            })
            .rpc();
          toast.success(`Successfully created loan ${loanPda}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };

    const acceptLoan = async (
      loan_idx: number,
      loan_account: string,
      loan_owner_public_key: string,
      token_details: Coin
    ) => {
      // Check if the program exist and wallet is connected
      // then run InitializeUser() from smart contract
      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();
          const mint = new PublicKey(token_details.mint_address);

          setTrxPend(true);
          const [profilePda, _] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const toAta = await getOrCreateAssociatedTokenAccount(
            program.provider.connection,
            publicKey,
            mint,
            publicKey,
            true
          );

          const txHash = await program.methods
            .acceptLoan(loan_idx)
            .accounts({
              toAta: toAta.address,
              fromAta: new PublicKey(token_details.admin_ata),
              tokenProgram: TOKEN_PROGRAM_ID,
              userProfile: profilePda,
              ataPdaAuthority: new PublicKey(token_details.admin_ata_pda),

              loanAccount: new PublicKey(loan_account),
              systemProgram: new PublicKey("11111111111111111111111111111111"),
              authorityPublicKey: new PublicKey(loan_owner_public_key),
              authority: publicKey,
            })
            .rpc();
          toast.success(`Successfully accepted loan ${loan_account}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };

    const getTokenBalance = async ( token_details: Coin) => {
      try {
        if (!publicKey) return;
        if (!program) return;
        const mint = new PublicKey(token_details.mint_address); // USDC devnet
        const Ata = await getOrCreateAssociatedTokenAccount(
          program.provider.connection,
          publicKey,
          mint,
          publicKey,
          true
        );
        const info = await connection.getTokenAccountBalance(Ata.address);
        console.log(info.value);

        if (info.value.uiAmount == null) throw new Error("No balance found");
        return info.value.uiAmount;
      } catch (error: any) {
        if (error.toString().includes("TokenAccountNotFoundError")) {
          return 0;
        }
      }
    };

    const withdrawCollaterial = async (amount: number, token_details: Coin) => {
      if (+amount < 0) return;

      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();
          const mint = new PublicKey(token_details.mint_address); // USDC devnet

          setTrxPend(true);
          const [profilePda, _] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const toAta = await getOrCreateAssociatedTokenAccount(
            program.provider.connection,
            publicKey,
            mint,
            publicKey,
            true
          );

          const withdrawAmount = new BN(
            Math.trunc(amount * 10 ** token_details.decimals)
          );

          const txHash = await program.methods
            .withdrawCollaterial(withdrawAmount)
            .accounts({
              fromAta: new PublicKey(token_details.admin_ata),
              toAta: toAta.address,
              tokenProgram: TOKEN_PROGRAM_ID,
              userProfile: profilePda,
              authority: publicKey,
              ataPdaAuthority: new PublicKey(
                "9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"
              ),
            })
            .rpc();
          toast.success(`Successfully withdrawn ${amount}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };

    const withdrawLamport = async (amount: number) => {
      if (+amount < 0) return;
      // Check if the program exist and wallet is connected
      // then run InitializeUser() from smart contract
      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();

          setTrxPend(true);
          const transferAmount = new BN(Math.trunc(amount * LAMPORTS_PER_SOL));

          console.log(Math.trunc(amount * LAMPORTS_PER_SOL));

          const txHash = await program.methods
            .withdrawLamport(transferAmount)
            .accounts({
              from: publicKey,
              to: new PublicKey("HGFNBb2iDtJieauecu8GPGa6zzUdVJfbQr4GzusgRAnn"),
              systemProgram: SystemProgram.programId,
            })
            .rpc();
          toast.success(`Successfully transfer sol ${amount}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };
    const depositLamport = async (amount: number) => {
      if (+amount < 0) return;
      // Check if the program exist and wallet is connected
      // then run InitializeUser() from smart contract
      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();

          setTrxPend(true);
          const transferAmount = new BN(Math.trunc(amount * LAMPORTS_PER_SOL));

          const transaction = new Transaction().add(
            SystemProgram.transfer({
              fromPubkey: publicKey,
              toPubkey: new PublicKey(
                "CikEi4TuJUYgYQAcV4pryWw2sU6qbFGSv6msSM3dH4cr"
              ),
              lamports: transferAmount,
            })
          );

          // let a = await simulateTransaction(connection, transaction, []).then(
          //   (res) => {
          //     console.log(res);
          //   }
          // );
          // console.log(a);

          // const txHash = await program.methods
          //   .withdrawLamport(transferAmount)
          //   .accounts({
          //     from: new PublicKey("9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"),
          //     to: publicKey,
          //     systemProgram: SystemProgram.programId,
          //   })
          //   .rpc();

          const txHash2 = await program.methods
            .depositLamport(transferAmount)
            .accounts({
              from: publicKey,
              to: new PublicKey("CikEi4TuJUYgYQAcV4pryWw2sU6qbFGSv6msSM3dH4cr"),
              systemProgram: SystemProgram.programId,
            })
            .rpc();
          toast.success(`Successfully transfer sol ${amount}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };
    const depositCollaterial = async (amount: number, token_details: Coin) => {
      if (+amount < 0) return;

      // Check if the program exist and wallet is connected
      // then run InitializeUser() from smart contract
      if (program && publicKey) {
        try {
          if (!initialized) await initializeUser();
          const mint = new PublicKey(token_details.mint_address); // USDC devnet

          setTrxPend(true);
          const [profilePda, _] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          const fromAta = await getOrCreateAssociatedTokenAccount(
            program.provider.connection,
            publicKey,
            mint,
            publicKey,
            true
          );

          const transferAmount = new BN(
            Math.trunc(amount * 10 ** token_details.decimals)
          );

          const txHash = await program.methods
            .depositCollaterial(transferAmount)
            .accounts({
              fromAta: fromAta.address,
              toAta: new PublicKey(token_details.admin_ata),
              tokenProgram: TOKEN_PROGRAM_ID,
              userProfile: profilePda,
              authority: publicKey,
            })
            .rpc();
          toast.success(`Successfully deposited ${amount}`);

          setInitialized(true);
        } catch (error: any) {
          console.log(error);
          toast.error(error.toString());
        } finally {
          setTrxPend(false);
        }
      }
    };
    return {
      initializeUser,
      setInitialized,
      Trxpend,
      initialized,
      loading,
      deposit,
      lent,
      depositCollaterial,
      createLoan,
      acceptLoan,
      availableLoans,
      ellipsify,
      withdrawCollaterial,
      getTokenBalance,
      publicKey,
      program,
      userDebt,
      findProfileAccounts,
    };
  }
  const findProfileAccounts = async () => {
    if (program && publicKey && !Trxpend) {
      try {
        setLoading(true);
        const [profilePda, profileBump] = findProgramAddressSync(
          [utf8.encode("USER_STATE"), publicKey.toBuffer()],
          program.programId
        );

        const profileAccount = await program.account.userProfile.fetch(
          profilePda
        );

        if (profileAccount) {
          let totalDeposit = profileAccount.totalDeposit / 10 ** 9;
          let totalLent = profileAccount.totalLent / 10 ** 6;

          const userLoan = await program.account.loan.all([
            {
              memcmp: {
                offset: 64 + 8, // Discriminator.
                bytes: publicKey.toBase58(),
              },
            },
          ]);

          const debt = userLoan.reduce((totalDebt, loan) => {
            return totalDebt + loan.account.amount.toNumber();
          }, 0);

          setUserDebt(debt.toString() ?? "***");
          setTotalDeposit(totalDeposit.toString() ?? "***");
          setTotalLending(totalLent.toString() ?? "***");
          setLastLoan(profileAccount.lastLoan);
          setInitialized(true);

          const loanAccounts = await program.account.loan.all();

          setAvailableLoans(loanAccounts as any);
        } else {
          setInitialized(false);
        }
        console.log(initialized);
      } catch (error) {
        console.log(error);
        setInitialized(loading);
        // setTodos([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(
        connection,
        anchorWallet,
        anchor.AnchorProvider.defaultOptions()
      );
      return new anchor.Program(
        peerIDL as anchor.Idl,
        PEER_PROTOCOL_PROGRAM_PUBKEY,
        provider
      );
    }
  }, [connection, anchorWallet]);

  const state = programState();
  useEffect(() => {
    state.findProfileAccounts();
  }, [state.publicKey, state.program, state.Trxpend]);

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};
