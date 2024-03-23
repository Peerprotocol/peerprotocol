import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const Navbar = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();
  const wallet = wallets[0];

  function ellipsifyFirstLast(str: String, numCharacters: any) {
    if (str.length <= numCharacters * 2) {
      return str;
    } else {
      const firstPart = str.substring(0, numCharacters);
      const lastPart = str.substring(str.length - numCharacters);
      return firstPart + "..." + lastPart;
    }
  }

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
