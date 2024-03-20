import React from "react";
const Transaction = () => {
  return (
    <div className="h-20 mx-14 border border-neutral-700 rounded-2xl bg-[#FFFFFF0D] flex justify-between px-24 items-center">
      <div className="flex items-center gap-8">
        <p>Position Overview</p>
        <div className="flex gap-8">
          <p className="border py-3 px-6 rounded-full">Transaction History</p>
        </div>
      </div>
      <div className="border py-2 px-12 rounded-full">
        <p>Filter</p>
      </div>
    </div>
  );
};

export default Transaction;
