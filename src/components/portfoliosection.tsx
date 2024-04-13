import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";
import { useUserState } from "@/hooks/user_states";
import { parse } from "path";

const IndexPage = () => {
  const {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
    userDebt,
  } = useUserState();

  const [health, setHealth] = useState(0);

  useEffect(() => {
    // if (parseInt(lent) > 0) {
    //   setHealth((parseInt(deposit) / parseInt(lent)) * 100);
    // } else {
    setHealth(100);
    // }
  }, [deposit, lent]);

  const displayDeposit = initialized ? deposit : 0;
  const displayLent = initialized ? lent : 0;

  function getHealthColor(health: number) {
    let color;
    if (health < 50) {
      color = `rgba(${225}, ${Math.round(5.1 * health)}, 0)`;
    } else {
      const greenIntensity = Math.round(5.1 * (health - 50));
      color = `rgba(${225 - greenIntensity}, ${200}, 0)`;
    }
    return color;
  }

  const healthColor = getHealthColor(health);
  let debt = 0;
  for (let i = 0; i < userDebt.length; i++) {
    console.log(userDebt[i].account.amount.toNumber());
    debt += userDebt[i].account.amount.toNumber();
  }
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex w-5/6 h-72 flex-row items-center justify-center my-8 bg-[#ffffff0e] border border-neutral-700 rounded-3xl">
        <div className="grid h-[fit-content] grid-cols-3 gap-28 place-items-start">
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Deposited"} value={`$${displayDeposit}`} />
          </div>
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Lended"} value={`$${displayLent}`} />
          </div>
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Borrowed"} value={`$${debt / 10 ** 6}`} />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-center w-80 h-72 items-center rounded-full tracking-widest"
        style={{ backgroundColor: healthColor }}
      >
        <div className="flex flex-col items-center justify-center bg-transparent border-solid border-2 border-black w-[90%] h-[90%] rounded-full">
          <p className="text-7xl font-bold">{health}%</p>
          <p className="text-lg">Health</p>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
