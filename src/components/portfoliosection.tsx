import React from "react";
import InfoCard from "./infocard";
import Health from "./healthmeter";
import { useUserState } from "@/hooks/user_states";

const IndexPage = () => {
  const {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
  } = useUserState();
  console.log(deposit);
  console.log(lent);

  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex w-5/6 h-72 flex-row items-center justify-center my-8 bg-[#ffffff0e] border border-neutral-700 rounded-3xl">
        <div className="grid h-[fit-content] grid-cols-3 gap-28 place-items-start">
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Deposited"} value={`$${deposit}`} />
          </div>
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Lended"} value={`$${lent}`} />
          </div>
          <div className="flex h-full leading-10 tracking-widest">
            <InfoCard title={"Total Borrowed"} value={`$${lent}`} />
          </div>
        </div>
      </div>
      <Health />
    </div>
  );
};

export default IndexPage;
