"use client";
import React from "react";
import Navbar from "@/components/nav";
import Image from "next/image";
import DepCom from "@/components/dep_com";
import { WalletConnectProvider } from "@/components/WalletConnectProvider";

const Borrowpage = () => {
  return (
    <WalletConnectProvider>
      <div className="h-screen bg-black p-0 border-2 border-red-700">
        <Navbar />
        <div className="flex justify-center h-[calc(100%-55px-40px)] items-center">
          <DepCom />
        </div>
      </div>
    </WalletConnectProvider>
  );
};

export default Borrowpage;
