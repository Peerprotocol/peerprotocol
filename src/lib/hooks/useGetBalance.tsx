import { useEffect, useState } from "react";
import { connection } from "../utils/connection";
import { PublicKey } from "@solana/web3.js";
// import web3 from "../web3";

export const useGetBalance = (address: PublicKey | null | undefined) => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      try {
        if (!address) {
          setBalance(0);
          return;
        }
        const balance = await connection.getBalance(address);
        setBalance(balance);
      } catch (error) {
        console.log(error);
        setBalance(0);
      }
    };
    getBalance();
  }, [address]);

  return { balance };
};
