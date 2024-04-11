"use client";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { usePathname } from "next/navigation";
import { useUserState } from "@/hooks/user_states";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
const SelectSwitch = () => {
  const pathname = usePathname();
  const [amount, setAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState(0);

  const handleMaxClick = async () => {
    const balance = await getSplTokenBalance(
      "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
    );

    if (pathname === "/deposit") {
      setAmount(`${balance}`);
    }else{
      setAmount(deposit);
    }
  };

  const depositFunds = async (e: any) => {
    e.preventDefault();
    const realAmount = parseInt(amount);
    
    try {
        let transactionMessage = '';
        
        if (pathname === "/deposit") {
            await depositCollaterial(
              realAmount,
              "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
            );
            transactionMessage = `Successfully deposited ${realAmount} tokens.`;
        } else {
            await withdrawCollaterial(
              realAmount,
              "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
            );
            transactionMessage = `Successfully withdrew ${realAmount} tokens.`;
        }

        toast.success(transactionMessage);
    } catch (error: any) {
        console.error("Transaction failed:", error);
        toast.error(`Transaction failed: ${error.message}`);
    }
};
  const {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
    depositCollaterial,
    withdrawCollaterial,
    getSplTokenBalance,
    loans,
    program,
    publicKey,
  } = useUserState();

  useEffect(() => {
    if (!program) return;
    if (!publicKey) return;
    if (!initialized) return;
    console.log("loans", loans);
    const getAmount = async () => {
      const balance = await getSplTokenBalance(
        "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
      );
     
      if (pathname === "/deposit") {
        if (balance) setMaxAmount(balance);
      }else{
        setMaxAmount(parseInt(deposit));
      }
    };
    getAmount();
  }, [program, publicKey, initialized]);


  const isDepositPage = pathname === "/deposit";
  const actionText = isDepositPage ? "Deposit" : "Withdraw";
  const placeholderText = isDepositPage ? "Enter amount to deposit" : "Enter amount to withdraw";


  return (
    <div>
      <div className="flex justify-between items-center">
      <span>You&apos;re {actionText.toLowerCase()}ing</span>
        <span className="text-[#ffffff2c] text-sm cursor-pointer max-amount">
          {maxAmount} USDC
        </span>
      </div>

      <form method="post">
        <div className="w-full mt-4 flex gap-4 px-4 py-1.5 items-center bg-[#ffffff2c] rounded-2xl">
          <div className="border rounded-xl px-2 bg-[#ffffff15]">
            <select className="text-white relative p-2 px-4 py-3 bg-[#ffffff00]">
              <option value="option3">USDC</option>
            </select>
          </div>

          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            placeholder={placeholderText}
            className="h-14 flex w-full rounded-2xl text-2xl bg-transparent border-none outline-none"
          />

          <button
            className="text-[#ffffff4b] pr-8"
            onClick={(e) => {
              e.preventDefault();
              handleMaxClick();
            }}
          >
            MAX
          </button>
        </div>
      </form>

      <button
        className="px-8 py-4 rounded-2xl bg-green-700 text-white w-full mt-9 h-fit"
        onClick={(e: any) => depositFunds(e)}
      >
        {transactionPending ? "Processing" : actionText}
      </button>
    </div>
  );
};

export default SelectSwitch;
