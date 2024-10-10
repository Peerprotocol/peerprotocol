"use client";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { allowedCoins } from "../constants/coins";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
// import { UserContext } from "./WalletConnectProvider";
import { formatNumber } from "@/data/format_number";

const SelectSwitch = () => {
  const pathname = usePathname();
  const [amount, setAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("-");
  const [coin, setCoin] = useState(allowedCoins[0]);
  const [client, setClient] = useState(false);

  // const pState = useContext(UserContext);

  const handleMaxClick = async () => {
    // const balance = await pState.getTokenBalance(coin);

    if (pathname === "/deposit") {
      // setAmount(`${balance}`);
    } else {
      // setAmount(pState.deposit);
    }
  };

  // const depositFunds = async (e: any) => {
  //   e.preventDefault();
  //   const realAmount = parseFloat(amount);

  //   try {
  //     let transactionMessage = "";

  //     if (pathname === "/deposit") {
  //       await pState.depositCollaterial(realAmount, coin);
  //       transactionMessage = `Successfully deposited ${realAmount} tokens.`;
  //     } else {
  //       await pState.withdrawCollaterial(realAmount, coin);
  //       transactionMessage = `Successfully withdrew ${realAmount} tokens.`;
  //     }

  //     toast.success(transactionMessage);
  //   } catch (error: any) {
  //     console.error("Transaction failed:", error);
  //     toast.error(`Transaction failed: ${error.message}`);
  //   }
  // };

  // useEffect(() => {
  //   if (!pState.program) return;
  //   if (!pState.publicKey) return;
  //   if (!pState.initialized) return;
  //   console.log("loans", pState.availableLoans);
  //   const getAmount = async () => {
  //     // deposit
  //     const balance = await pState.getTokenBalance(coin);

  //     if (pathname === "/deposit") {
  //       setMaxAmount(`${balance}`);
  //     } else {
  //       setMaxAmount(pState.deposit.toString());
  //     }
  //   };
  //   setClient(true);
  //   getAmount();
  // }, [
  //   pState.program,
  //   pState.publicKey,
  //   pState.initialized,
  //   pState.Trxpend,
  //   coin,
  // ]);
  const selectCoin = (e: any) => {
    setCoin(allowedCoins[e.target.selectedIndex]);
  };

  const isDepositPage = pathname === "/deposit";
  const actionText = isDepositPage ? "Deposit" : "Withdraw";
  const placeholderText = isDepositPage
    ? "Enter amount to deposit"
    : "Enter amount to withdraw";

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>You&apos;re {actionText.toLowerCase()}ing</span>
        <span className="text-[#ffffff2c] text-sm cursor-pointer max-amount">
          {formatNumber(+maxAmount)} USD
        </span>
      </div>

      <form method="post">
        <div className="w-full mt-4 flex gap-4 px-4 py-1.5 items-center bg-[#ffffff2c] rounded-2xl">
          <div className="border rounded-xl px-2 bg-[#ffffff15]">
            <select
              className="text-white relative p-2 px-4 py-3 bg-[#ffffff00]"
              onChange={(e) => selectCoin(e)}
            >
              {allowedCoins.map((coin_, i) => (
                <option key={i}>
                  {/* {client && (
                    <Image
                      src={coin["image"]}
                      alt="Description of the image"
                      width={20}
                      height={20}
                    />
                  )} */}
                  {coin_.ticker}
                </option>
              ))}
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

      {/* <button
        className="px-8 py-4 rounded-2xl bg-green-700 text-white w-full mt-9 h-fit"
        onClick={(e: any) => depositFunds(e)}
      >
        {pState.Trxpend ? "Processing" : actionText}
      </button> */}
    </div>
  );
};

export default SelectSwitch;
