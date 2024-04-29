"use client";
import Navbar from "../../components/nav";
import Portfolio from "../../components/portfoliosection";
import Transaction from "../../components/TransactionHistory";
import { WalletConnectProvider } from "../../components/WalletConnectProvider";
export default function Home() {
  return (
    <main className="w-full p-4 bg-black">
      <WalletConnectProvider>
        <Navbar />
        <section className="max-w-7xl mx-auto w-full p-4">
          <Portfolio />
          <Transaction />
        </section>
      </WalletConnectProvider>
    </main>
  );
}
