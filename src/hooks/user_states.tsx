import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import { PEER_PROTOCOL_PROGRAM_PUBKEY } from "../constants";
import peerIDL from "../constants/idl.json";
import toast from "react-hot-toast";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { BN } from "@project-serum/anchor";

import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
// https://solana.stackexchange.com/questions/2912/creating-an-associated-token-account-via-solana-program
export function useUserState() {
  const { connection } = useConnection();
  const { sendTransaction, publicKey, signTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [deposit, setTotalDeposit] = useState("");
  const [lent, setTotalLending] = useState("");
  const [loans, setLoans] = useState([]);

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
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
  useEffect(() => {
    // Fetch a userprofile from the blockchain
    const findProfileAccounts = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [profilePda, profileBump] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          console.log(profilePda);

          const profileAccount = await program.account.userProfile.fetch(
            profilePda
          );

          if (profileAccount) {
            console.log(profileAccount);
            let totalDeposit = profileAccount.totalDeposit / 10 ** 6;
            setTotalDeposit(totalDeposit.toString() ?? "***");
            setTotalLending(profileAccount.totalLent ?? "***");
            setInitialized(true);
            console.log(program.account);
            const loanAccounts = (await program.account.loan.all([
              // authorFilter(publicKey.toString()),
            ])) as any;
            setLoans(loanAccounts);
            // setTodos(todoAccounts);
          } else {
            setInitialized(false);
          }
        } catch (error) {
          console.log(error);
          setInitialized(false);
          // setTodos([]);
        } finally {
          setLoading(false);
        }
      }
    };

    findProfileAccounts();
  }, [publicKey, program, transactionPending]);
  function ellipsifyFirstLast(str: String, numCharacters: any) {
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
        setTransactionPending(true);
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
            pool: new PublicKey("9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"),
          })
          .rpc();
        toast.success("Successfully Intialized");

        setInitialized(true);
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const createLoan = async (
    duration: number,
    interest_rate: number,
    amount: number,
    loan_account: string,
    mint_address: string
  ) => {
    if (+amount < 0) return;
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        if (!initialized) await initializeUser();
        const mint = new PublicKey(mint_address);

        setTransactionPending(true);
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

        const transferAmount = new BN(Math.trunc(amount * 10 ** 6));

        const txHash = await program.methods
          .createLoan(duration, interest_rate, amount)
          .accounts({
            fromAta: fromAta.address,
            toAta: new PublicKey("cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"),
            tokenProgram: TOKEN_PROGRAM_ID,
            userProfile: profilePda,
            loanAccount: new PublicKey(loan_account),
            systemProgram: new PublicKey("11111111111111111111111111111111"),
            authority: publicKey,
          })
          .rpc();
        toast.success(`Successfully created loan ${loan_account}`);

        setInitialized(true);
      } catch (error: any) {
        console.log(error);
        toast.error(error.toString());
      } finally {
        setTransactionPending(false);
      }
    }
  };

  const acceptLoan = async (
    loan_idx: number,
    loan_account: string,
    loan_owner_public_key: string,
    mint_address: string
  ) => {
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        if (!initialized) await initializeUser();
        const mint = new PublicKey(mint_address);

        setTransactionPending(true);
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

        console.log("loaind");

        const txHash = await program.methods
          .acceptLoan(loan_idx)
          .accounts({
            toAta: toAta.address,
            fromAta: new PublicKey(
              "cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"
            ),
            tokenProgram: TOKEN_PROGRAM_ID,
            userProfile: profilePda,
            ata_pda_authority: new PublicKey(
              "9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"
            ),
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
        setTransactionPending(false);
      }
    }
  };

  const getSplTokenBalance = async (mint_: any) => {
    try {
      if (!publicKey) return;
      if (!program) return;
      const mint = new PublicKey(mint_); // USDC devnet
      const Ata = await getOrCreateAssociatedTokenAccount(
        program.provider.connection,
        publicKey,
        mint,
        publicKey,
        true
      );
      const info = await connection.getTokenAccountBalance(Ata.address);
      console.log(info);
      if (info.value.uiAmount == null) throw new Error("No balance found");
      console.log("Balance (using Solana-Web3.js): ", info.value.uiAmount);
      return info.value.uiAmount;
    } catch (error: any) {
      console.log(error.toString().includes("TokenAccountNotFoundError"));
      if (error.toString().includes("TokenAccountNotFoundError")) {
        return 0;
      }
    }
  };

  const withdrawCollaterial = async (
    amount: number,
    token_public_key: string
  ) => {
    console.log(`withdrawing ${amount}`);
    if (+amount < 0) return;
    if (program && publicKey) {
      try {
        if (!initialized) await initializeUser();
        const mint = new PublicKey(token_public_key); // USDC devnet

        setTransactionPending(true);
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

        const withdrawAmount = new BN(Math.trunc(amount * 10 ** 6));

        const txHash = await program.methods
          .withdrawCollaterial(withdrawAmount)
          .accounts({
            fromAta: new PublicKey(
              "cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"
            ),
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
        setTransactionPending(false);
      }
    }
  };
  const depositCollaterial = async (
    amount: number,
    token_public_key: string
  ) => {
    if (+amount < 0) return;
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        if (!initialized) await initializeUser();
        const mint = new PublicKey(token_public_key); // USDC devnet

        setTransactionPending(true);
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

        const transferAmount = new BN(Math.trunc(amount * 10 ** 6));

        console.log(transferAmount.toString());
        const txHash = await program.methods
          .depositCollaterial(transferAmount)
          .accounts({
            fromAta: fromAta.address,
            toAta: new PublicKey("cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"),
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
        setTransactionPending(false);
      }
    }
  };
  return {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
    depositCollaterial,
    createLoan,
    acceptLoan,
    loans,
    ellipsifyFirstLast,
    withdrawCollaterial,
    getSplTokenBalance,
    publicKey,
    program,
  };
}
