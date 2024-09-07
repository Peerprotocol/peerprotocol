import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "./DarkMode";

const Features = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => { }, [isDarkMode]);

  return (
    <div
      className={`${isDarkMode ? "bg-[#0d101711] px-0" : "bg-[#fff]"}
    flex flex-wrap justify-center gap-8 pb-14 lg:my-40`}
    >
      {/* Card 1 */}
      <div className="w-[19rem] pr-9 lg:w-[26rem] bg-black z-10 relative rounded-2xl">
        <div className={`border-2 border-current z-20 w-[18.5rem] lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-3 p-8 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}>
          <Image
            src="/images/deal.svg"
            width={40}
            height={40}
            alt=""
            className="lg:w-[40px] w-6"
          />
          <p className="font-semibold lg:py-3 p-1">
            Competitive Interest Rates
          </p>
          <p className="lg:text-base text-[1rem] tracking-wide text-sm">
            Experience decentralized lending with a balanced approach to interest rates & yield.
          </p>
        </div>
      </div>


      {/* Card 2 */}
      <div className="w-[19rem] pr-9 lg:w-[26rem] bg-black z-10 relative rounded-2xl">
        <div className={`border-2 border-current z-20 w-[18.5rem] lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-3 p-8 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}>
          <Image
            src="/images/deal.svg"
            width={40}
            height={40}
            alt=""
            className="lg:w-[40px] w-6"
          />
          <p className="font-semibold lg:py-3 p-1">
            Competitive Interest Rates
          </p>
          <p className="lg:text-base text-[1rem] tracking-wide text-sm">
            Experience decentralized lending with a balanced approach to interest rates & yield.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="w-[19rem] pr-9 lg:w-[26rem] bg-black z-10 relative rounded-2xl">
        <div className={`border-2 border-current z-20 w-[18.5rem] lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-3 p-8 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}>
          <Image
            src="/images/deal.svg"
            width={40}
            height={40}
            alt=""
            className="lg:w-[40px] w-6"
          />
          <p className="font-semibold lg:py-3 p-1">
            Competitive Interest Rates
          </p>
          <p className="lg:text-base text-[1rem] tracking-wide text-sm">
            Experience decentralized lending with a balanced approach to interest rates & yield.
          </p>
        </div>
      </div>
    </div>

  );
};

export default Features;
