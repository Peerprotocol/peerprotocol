import React from "react";

const SelectSwitch = () => {
  return (
    <div>
      <div className="w-full flex gap-4 px-4 py-1.5 items-center bg-[#ffffff2c] rounded-2xl">
        <select className="text-white bg-[#ffffff15] relative px-8 border rounded-3xl py-2">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <input type="number"   min={0} placeholder="Enter Amount" className="h-14 flex w-full rounded-2xl text-2xl bg-transparent border-none outline-none"></input>
        <p className="text-[#ffffff15] pr-8">MAX</p>
      </div>
    </div>
  );
};

export default SelectSwitch;
