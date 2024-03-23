"use client";
import { WalletConnectProvider } from "@/components/WalletConnectProvider";
import BorrowComponent from "@/components/borrowComponent";
import Navbar from "@/components/nav";
import Link from "next/link";
import React from "react";

const Borrow = () => {
  return (
    <WalletConnectProvider>
      <div>
        <Navbar />
        <section className="max-w-7xl mx-auto w-full px-4 py-2">
          <div className="flex flex-row h-[4rem] w-full items-center justify-between px-4 py-2 mb-4 rounded-xl bg-[#FFFFFF0D] ">
            <span className="flex flex-row justify-evenly w-[12%]">
              <Link href="/borrow">Borrow</Link>
              <Link href="/borrow">Lend</Link>
            </span>
            <span className="flex flex-row justify-evenly w-[30%] text-white bg-transparent">
              <select name="filter" aria-readonly className="bg-transparent">
                <option value="filter">Filter</option>
              </select>
              <select name="token" className="bg-transparent">
                <option value="token">Token</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
              </select>
              <select name="rate" className="bg-transparent">
                <option value="rate">Rate</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
              </select>
              <select name="duration" className="bg-transparent">
                <option value="Duration">Duration</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
              </select>
            </span>
          </div>
          <BorrowComponent />
        </section>
      </div>
    </WalletConnectProvider>
    <div>
      <Navbar />
      <section className="max-w-7xl mx-auto w-full px-4 py-2">
        <div className="flex flex-row h-[4rem] w-full items-center justify-between px-4 py-2 mb-4 rounded-xl bg-[#FFFFFF0D] ">
          <span className="flex flex-row justify-evenly w-[12%]">
            <Link href="/borrow">Borrow</Link>
            <Link href="/borrow">Lend</Link>
          </span>
          <span className="flex flex-row justify-evenly w-[30%] text-white bg-transparent">
            <select name="filter" aria-readonly className="bg-transparent">
              <option value="filter">Filter</option>
            </select>
            <select name="token" className="bg-transparent">
              <option value="token">Token</option>
              <option value="STEP">STEP</option>
              <option value="STEP">STEP</option>
              <option value="STEP">STEP</option>
              <option value="STEP">STEP</option>
            </select>
            <select name="rate" className="bg-transparent">
              <option value="rate">Rate</option>
              <option value="5%">5%</option>
              <option value="5%">5%</option>
              <option value="5%">5%</option>
              <option value="5%">5%</option>
            </select>
            <select name="duration" className="bg-transparent">
              <option value="Duration">Duration</option>
              <option value="7days">7 Days</option>
              <option value="7days">7 Days</option>
              <option value="7days">7 Days</option>
              <option value="7days">7 Days</option>
              <option value="7days">7 Days</option>
            </select>
          </span>
        </div>
        <BorrowComponent />
      </section>
    </div>
  );
};

export default Borrow;
