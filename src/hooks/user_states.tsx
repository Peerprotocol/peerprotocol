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
  const acceptCollaterial = async (
    amount: number,
    token_public_key: string
  ) => {
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
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

        const transferAmount = new BN(amount);
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
    loan_account: string
  ) => {
    if (+amount < 0) return;
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        const mint = new PublicKey(
          "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
        ); // USDC devnet

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
            authority_public_key: new PublicKey(
              "7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk"
            ),
            toAta: new PublicKey("cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"),
            tokenProgram: TOKEN_PROGRAM_ID,
            userProfile: profilePda,
            pda: new PublicKey("9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"),
            loanAccount: new PublicKey(loan_account),
            systemProgram: new PublicKey("11111111111111111111111111111111"),
            authority: publicKey,
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

  const acceptLoan = async (
    loan_idx: number,
    loan_account: string,
    authority_public_key: string
  ) => {
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        const mint = new PublicKey(
          "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
        ); // USDC devnet

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
            authority_public_key: new PublicKey(
              "7iT5H86QPoNFjGt1X2cMEJot4mr5Ns4uzhLN3GJKQ5kk"
            ),
            fromAta: new PublicKey(
              "cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN"
            ),
            tokenProgram: TOKEN_PROGRAM_ID,
            userProfile: profilePda,
            pda: new PublicKey("9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE"),
            loanAccount: new PublicKey(loan_account),
            systemProgram: new PublicKey("11111111111111111111111111111111"),
            authorityPublicKey: new PublicKey(authority_public_key),
            authority: publicKey,
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

  const depositCollaterial = async (
    amount: number,
    token_public_key: string
  ) => {
    if (+amount < 0) return;
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
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
  };
}
