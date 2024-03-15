import React from "react";
import SelectSwitch from "./selectswitchborrow";
import Image from "next/image";

const Borrow = () => {
  return (
    <div className="bg-[#ffffff13] h-96 w-full max-w-xl px-6 py-6 rounded-3xl">
      <div className="flex justify-between gap-24">
        <div className="flex gap-6 mb-8">
          <p>Deposit</p>
          <p>Withdraw</p>
        </div>

        <div>
          <Image
            src="images/cancel.svg"
            alt="Description of the image"
            width={25}
            height={25}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="w-full">
          <SelectSwitch />
        </div>

        <button className="px-8 py-4 rounded-2xl bg-green-700 text-white w-full  mt-9 h-fit">
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Borrow;
