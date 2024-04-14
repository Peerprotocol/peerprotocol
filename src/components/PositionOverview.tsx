import React, { useState } from "react";

const PositionOverview = () => {

  return (
    <div className="bg-[#FFFFFF0D] my-6 h-[fit-content] p-4 rounded-xl">
        <div className="grid grid-cols-4 text-center h-full px-6 py-3 justify-center place-items-center border border-neutral-700 rounded-xl">
            <p className={ `leading-10 text-[1.2rem]`}>Position Type</p>
            <p className={ `leading-10 text-[1.2rem]`}>Asset</p>
            <p className={ `leading-10 text-[1.2rem]`}>Status</p>
            <p className={ `leading-10 text-[1.2rem]`}>Action</p>
        </div>

        <div className="grid grid-cols-4 mt-4 text-center h-full px-6 py-3 justify-center place-items-center border border-neutral-700 rounded-xl">
            <div className="flex flex-col gap-2" >
                <p className={ `leading-10 text-[1.2rem]`}>Lend</p>
                <p className={ `leading-10 text-[1.2rem]`}>Borrow</p>
                <p className={ `leading-10 text-[1.2rem]`}>Lend</p>
                <p className={ `leading-10 text-[1.2rem]`}>Borrow</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className={ `leading-10 text-[1.2rem]`}>SOL</p>
                <p className={ `leading-10 text-[1.2rem]`}>USDC</p>
                <p className={ `leading-10 text-[1.2rem]`}>BONK</p>
                <p className={ `leading-10 text-[1.2rem]`}>USDC</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className={ `leading-10 text-[1.2rem]`}>Open</p>
                <p className={ `leading-10 text-[1.2rem]`}>Open</p>
                <p className={ `leading-10 text-[1.2rem]`}>Open</p>
                <p className={ `leading-10 text-[1.2rem]`}>Open</p>
            </div>
            <div className="flex flex-col gap-2">
                <p className={ `leading-10 text-[1.2rem]`}>N/A</p>
                <button className="border px-8 py-2 rounded-full">Close</button>
                <p className={ `leading-10 text-[1.2rem]`}>N/A</p>
                <button className="border px-8 py-2 rounded-full">Close</button>
            </div>
        </div>
      
    </div>
  );
};

export default PositionOverview;
