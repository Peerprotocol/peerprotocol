import React from "react";
import InfoCard from "./infocard";
import { InfoCardprops } from "@/data/data";
import Health from "./healthmeter";

const IndexPage = () => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex w-5/6 h-72 flex-row items-center justify-center my-8 bg-[#ffffff0e] border border-neutral-700 rounded-3xl">
        <div className="grid h-[fit-content] grid-cols-3 gap-28 place-items-start">
          {InfoCardprops.map((info, index) => (
            <div key={index} className="flex h-full leading-10 tracking-widest">
              <InfoCard
                title={info.title}
                value={info.value}
                title1={info.title1}
                value1={info.value1}
              />
            </div>
          ))}
        </div>
      </div>
      <Health />
    </div>
  );
};

export default IndexPage;
