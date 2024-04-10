"use client";
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
import toast from "react-hot-toast";
import { SystemProgram } from "@solana/web3.js";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { useUserState } from "@/hooks/user_states";

const Navbar = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
  } = useUserState();
  const wallet = wallets[0];

  const handleWalletConnect = async () => {
    console.log('connecting to your wallet before initializing...');
    await new Promise(resolve => setTimeout(resolve, 4000)); 
    await initializeUser();
};

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
      <div className="flex" suppressHydrationWarning={true}>
        <div className="flex gap-16">
          <div className="flex items-center gap-8">
            <Link href="/peerapp">
              <p>Portfolio</p>
            </Link>
            <Link href="/deposit">
              <p>Deposit/Withdraw</p>
            </Link>
            <Link href="/borrow">
              <p>Borrow/Lend</p>
            </Link>
            {/* {!initialized ? (
              // <button onClick={initializeUser}>Initialize</button>
              
            ) : (
              <></>
            )} */}

            <WalletMultiButton
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                opacity: "90",
                color: "white",
                borderRadius: "20px",
                fontWeight: "100",
              }}

              onClick={handleWalletConnect}
              // disabled
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
