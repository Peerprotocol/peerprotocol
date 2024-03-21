import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { WalletAdapter } from "@solana/wallet-adapter-base";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

const Navbar = () => {
  const connectWallet = async () => {};
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

            <div
              className="flex gap-6 border-solid border-2 rounded-3xl px-4 py-2 border-transparent  bg-[#ffffff13]"
              onClick={connectWallet}
            >
              <div>
                <Image
                  src=".\images\phantom-img.svg"
                  alt="Description of the image"
                  width={25}
                  height={25}
                />
              </div>
              <p>0x94DGA6...03fFFjh</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
