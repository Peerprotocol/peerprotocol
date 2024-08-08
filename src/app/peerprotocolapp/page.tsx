"use client";
import Sidebar from "./sidebar";
import Image from "next/image";
import Dropdown from "./dropdown";
import Dashboard from "./dashboard";
import Market from "./market";
import Footer from "./footer";

import { WalletConnectProvider } from "../../components/WalletConnectProvider";
export default function Home() {
  return (
    <main className="bg-[#F5F5F5]">
      <WalletConnectProvider>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col h-full max-h-screen overflow-auto">
            <nav className="flex justify-end items-center p-4 w-full gap-3">
              <Image
                src="./images/Notification.svg"
                height={30}
                width={30}
                alt="Notification icon"
                className="ml-4"
              />
              <Dropdown />
              <div className="bg-[rgba(0,0,0,0.8)] flex items-center gap-2 py-2 rounded-3xl px-3">
                <Image
                  src="./images/walletconnect.svg"
                  height={20}
                  width={20}
                  alt="connect wallet"
                />
                <button className="text-sm">Connect</button>
              </div>
            </nav>
            <main className="flex-1 p-4">
              <Dashboard />
              <Market />
              <Footer />
            </main>
          </div>
        </div>
      </WalletConnectProvider>
    </main>
  );
}
