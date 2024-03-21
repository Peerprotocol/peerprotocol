import React from "react";
import SelectSwitch from "./selectswitchdeposit";
import Link from "next/link";

const DepCom = () => {
  return (
    <div className="bg-[#ffffff13] h-96 w-full max-w-xl px-6 py-6 rounded-3xl">
      <div className="flex justify-between gap-24">
        <div className="flex gap-6 mb-8">
        <Link href="/deposit">
        <button>Deposit</button>
            </Link>
       
          <button></button>
          <Link href="/withdraw">
            <button>Withdraw</button>
            </Link>
        </div>
      </div>

      <div className="mt-2">
        <div className="w-full">
          <SelectSwitch />
        </div>
      </div>
    </div>
  );
};

export default DepCom;
