import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "./DarkMode";

const Features = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {}, [isDarkMode]);

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-[#0d101711] px-0"
          : "bg-[#fff]"
      } lg:flex lg:flex-row text-current justify-center lg:gap-20 lg:py-20 lg:my-32 md:grid md:grid-cols-2 py-20 w-full flex flex-col gap-6`}
    >
      {/* Card 1 */}
      <div className="border-2 border-current lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-2 lg:mb-0 p-8 shadow-top-right-bottom">
        <Image
          src="/images/mybox.svg"
          width={40}
          height={40}
          alt=""
          className="lg:w-[40px] w-6"
        />
        <p className="font-semibold text-current lg:py-3 p-1">
          Transparent Marketplace
        </p>
        <p className="text-current lg:text-base text-[1rem] tracking-wide text-sm">
          Transparent marketplace, providing borrowers with real-time deals and
          ensuring trustworthy transactions.
        </p>
      </div>

      {/* Card 2 */}
      <div className="border-2 border-current lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-2 lg:mb-0 p-8">
        <Image
          src="/images/waterdrop.svg"
          width={40}
          height={40}
          alt=""
          className="lg:w-[40px] w-6"
        />
        <p className="font-semibold text-current lg:py-3 p-1">
          Transparent Marketplace
        </p>
        <p className="text-current lg:text-base text-[1rem] tracking-wide text-sm">
          Seamlessly navigate our user-friendly interface. Designed with
          simplicity & decentralization in mind
        </p>
      </div>

      {/* Card 3 */}
      <div className="border-2 border-current lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-2 lg:mb-0 p-8">
        <Image
          src="/images/deal.svg"
          width={40}
          height={40}
          alt=""
          className="lg:w-[40px] w-6"
        />
        <p className="font-semibold text-current lg:py-3 p-1">
          Transparent Marketplace
        </p>
        <p className="text-current lg:text-base text-[1rem] tracking-wide text-sm">
          Experience decentralized lending with a balanced approach to interest
          rates & yield.
        </p>
      </div>
    </div>
  );
};

export default Features;
