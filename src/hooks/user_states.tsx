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

          const profileAccount = await program.account.userProfile.fetch(
            profilePda
          );

          if (profileAccount) {
            console.log(profileAccount);
            setTotalDeposit(profileAccount.totalDeposit ?? "***");
            setTotalLending(profileAccount.totalLent ?? "***");
            setInitialized(true);
            // const todoAccounts = await program.account.todoAccount.all([
            //   authorFilter(publicKey.toString()),
            // ]);
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

  const depositCollaterial = async (
    amount: number,
    token_public_key: string
  ) => {
    // Check if the program exist and wallet is connected
    // then run InitializeUser() from smart contract
    if (program && publicKey) {
      try {
        const mint = new PublicKey(token_public_key); // USDC devnet

        // const mint = new PublicKey(
        //   "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
        // ); // USDC devnet

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
          signTransaction
        );

        //FIXME: This should be the token public key

        const toPublicKey = new PublicKey(
          "CikEi4TuJUYgYQAcV4pryWw2sU6qbFGSv6msSM3dH4cr"
        );

        const toAta = await getAssociatedTokenAddress(mint, toPublicKey);

        // Fires a list of instructions
        const mint_tx = new anchor.web3.Transaction().add(
          // Create the ATA account that is associated with our To wallet
          createAssociatedTokenAccountInstruction(
            publicKey,
            toAta,
            toPublicKey,
            mint
          )
        );

        const signature = await sendTransaction(mint_tx, connection);
        const response = await connection.confirmTransaction(
          signature,
          "processed"
        );
        console.log("response", response);
        const transferAmount = new BN(amount);
        console.log(program);
        const txHash = await program.methods
          .transferSplTokens(transferAmount)
          .accounts({
            from: publicKey,
            fromAta: fromAta,
            toAta: toAta,
            tokenProgram: TOKEN_PROGRAM_ID,
            user_profile: profilePda,
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
  };
}
