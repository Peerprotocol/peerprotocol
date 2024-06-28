import React, { useState, useEffect } from "react";
import InfoCard from "./infocard";
import { useUserState } from "./WalletConnectProvider";
import { parse } from "path";

const IndexPage = () => {
  const pState = useUserState();

  const [health, setHealth] = useState(0);

  useEffect(() => {
    if (+pState.userDebt / 10 ** 6 > 0) {
      const newdebt = +pState.userDebt / 10 ** 6;
      const result = (newdebt / parseInt(pState.deposit)) * 100;
      const newhealth = 100 - result;
      setHealth(parseFloat(newhealth.toPrecision(2)));
    } else {
      setHealth(100);
    }
  }, [pState.deposit, pState.lent, pState.userDebt]);

  const displayDeposit = pState.initialized ? pState.deposit : "-";
  const displayLent = pState.initialized ? pState.lent : "-";
  const displayDebt = pState.initialized ? pState.userDebt : "-";

  function getHealthColor(health: number) {
    let color;
    if (health <= 20) {
      color = `rgba(255, 0, 0)`;
    } else if (health > 20 && health < 50) {
      color = `rgba(${225}, ${Math.round(5.1 * health)}, 0)`;
    } else {
      const greenIntensity = Math.round(5.1 * (health - 50));
      color = `rgba(${225 - greenIntensity}, ${166}, 0)`;
    }
    return color;
  }

  const healthColor = getHealthColor(health);
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
            <InfoCard title={"Total Borrowed"} value={`$${displayDebt}`} />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col justify-center w-80 h-72 items-center rounded-full tracking-widest"
        style={{ backgroundColor: healthColor }}
      >
        <div
          className="flex flex-col items-center justify-center bg-transparent rounded-full w-[90%] h-[90%]"
          style={{ backgroundColor: healthColor }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center rounded-full bg-black">
            <p className="text-7xl font-bold">{health}%</p>
            <p className="text-lg">Health</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
