import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo } from "react";
import { PEER_PROTOCOL_PROGRAM_PUBKEY } from "../constants";
import peerIDL from "../constants/idl.json";
import toast from "react-hot-toast";
import { SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const wallet = wallets[0];

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionPending, setTransactionPending] = useState(false);
  const [input, setInput] = useState("");
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();

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
        console.log(profilePda);
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

  useEffect(() => {
    console.log("Initializing");
    // Fetch a userprofile from the blockchain
    const findProfileAccounts = async () => {
      if (program && publicKey && !transactionPending) {
        try {
          setLoading(true);
          const [profilePda, profileBump] = await findProgramAddressSync(
            [utf8.encode("USER_STATE"), publicKey.toBuffer()],
            program.programId
          );

          console.log("Profile Account", profilePda);
          const profileAccount = await program.account.userProfile.fetch(
            profilePda
          );

          if (profileAccount) {
            // setLastTodo(profileAccount.lastTodo);
            setInitialized(true);
            // const todoAccounts = await program.account.todoAccount.all([
            //   authorFilter(publicKey.toString()),
            // ]);
            // setTodos(todoAccounts);
          } else {
            console.log("NOT YET INITIALIZED");
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

  return (
    <nav role="navigation" className="flex justify-between mx-14 my-4">
      <div className="flex gap-3 items-center">
        <div>
          <Image
            src=".\images\logo.svg"
            alt="Description of the image"
            width={55}
            height={55}
          />
        </div>
        <p className="text-2xl">Peer Protocol</p>
      </div>
      <div className="flex">
        <div className="flex gap-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <p>Portfolio</p>
            </Link>
            <Link href="/deposit">
              <p>Deposit/Withdraw</p>
            </Link>
            <Link href="/borrow">
              <p>Borrow/Lend</p>
            </Link>
            <button onClick={initializeUser}>Initialize</button>

            <WalletMultiButton
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                opacity: "90",
                color: "white",
                borderRadius: "20px",
                fontWeight: "100",
              }}

              // disabled
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
