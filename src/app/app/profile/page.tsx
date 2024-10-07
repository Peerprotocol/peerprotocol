"use client";
import DepositWithdrawPeer from "./DepositWithdrawPeer";
import React, { useState } from "react";
import Nav from "../Nav";
import Sidebar from "../sidebar";
import Dashboard from "../../app/profile/Dashboard";
import Table from "./Table";
import Footer from "../footer";
import CryptoAnalyticsChart from "./CryptoAnalyticsChart";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { useProgram } from "@/context/program.context";

const Profile = () => {
  const { wallet } = useWallet();
  const { balance } = useGetBalance(wallet?.adapter.publicKey);
  const { userData, initUser, userProfileSolBal } = useProgram();

  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="flex">
        <Sidebar />
        {!userData ? (
          <div className="p-4">
            <p className="text-yellow-600 bg-yellow-100 px-4 py-2 rounded-md font-medium mb-4">
              No account created. Please initialize your account to continue.
            </p>
            <button
              className="bg-black text-white rounded-lg w-full py-3 mt-4 capitalize"
              onClick={() => {
                if (wallet?.adapter.publicKey) {
                  // initUser({ authority: wallet.adapter.publicKey });
                  initUser.mutate();
                }
              }}
            >
              Initialize Account
            </button>
          </div>
        ) : (
          <div className="w-full md:flex-1 flex flex-col">
            <Nav />
            <div className="flex flex-col lg:flex-row gap-6 py-6 px-3 md:px-8">
              <div className="w-full md:flex-wrap md:basis-[70%] flex">
                <Dashboard />
              </div>
              <div className="w-full md:flex-grow md:basis-[30%] flex">
                <DepositWithdrawPeer />
              </div>
            </div>
            <CryptoAnalyticsChart />
            <Table />
            <Footer />
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;
