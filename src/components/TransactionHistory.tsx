import React from "react";
import Transactiontable from "./TransactionTable";
const Transaction = () => {
  return (
    <section className="max-w-7xl mx-auto w-full">
      <div className="h-[fit-content] border border-neutral-700 rounded-2xl bg-[#FFFFFF0D] flex flex-row  justify-between px-4 py-6 items-center">
        <div className="flex flex-row items-center gap-8">
          <p>Position Overview</p>
          <p className="border py-3 px-6 rounded-full">Transaction History</p>
        </div>
        <p className="border py-2 px-12 rounded-full">Filter</p>
      </div>
      <Transactiontable />
    </section>
  );
};

export default Transaction;
