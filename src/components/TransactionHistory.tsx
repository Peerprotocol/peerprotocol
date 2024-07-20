import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import PositionOverview from "./PositionOverview";

const Transaction = () => {
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);

  const toggleView = () => {
    setShowTransactionHistory((prevState) => !prevState);
  };

  return (
    <section className="max-w-7xl mx-auto w-full">
      <div className="h-[fit-content] border border-neutral-700 rounded-2xl mb-4 bg-[#FFFFFF0D] flex flex-row  justify-between px-4 py-6 items-center">
        <div className="flex flex-row items-center gap-8">
          <button onClick={toggleView} className="border border-solid border-gray-700 active:border-white focus:border-white py-3 px-6 rounded-full">Position Overview</button>
          <button onClick={toggleView} className="border border-solid border-gray-700 active:border-white focus:border-white py-3 px-6 rounded-full">Transaction History</button>
        </div>
        <p className="border py-2 px-12 rounded-full">Filter</p>
      </div>
        {showTransactionHistory ? <PositionOverview /> : <TransactionTable /> }
    </section>
  );
};

export default Transaction;
