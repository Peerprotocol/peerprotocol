import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { DarkModeContext } from "./DarkMode";

const Team = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => { }, [isDarkMode]);
  return (
    <div id="Team" className="py-32">
      {/* start here */}
      <div className="w-fit gap-16 mx-auto md:grid-cols-2">
        <div className="mb-8">
          <h1 className={`{text-black text-4xl font-bold font-raleway} ${isDarkMode ? "text-white" : "text-black"
          }`}>
            OUR TEAM
          </h1>
        </div>
       <div className="lg:grid lg:grid-cols-3 gap-8 md:grid grid-cols-2 block">
         {/* deon face card */}
         <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Deon.png" alt="" width={380} height={40} />

          <div>
            <p className={`text-2xl font-semibold text-black py-1 ${isDarkMode ? "text-white" : "text-black"}`}>
              Emmanuel Daniel
            </p>
            <div className="flex justify-between">
              <p className="text-gray-500 font-semibold text-sm">
                Co-founder & CEO
              </p>
              <div className="flex">
                <Image
                  src="./images/Linkedinsvg.svg"
                  alt=""
                  width={20}
                  height={40}
                />
                <Image
                  src="./images/TwitterXsvg.svg"
                  alt=""
                  width={20}
                  height={40}
                />
                <Image
                  src="./images/Telegramsvg.svg"
                  alt=""
                  width={20}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kev face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/kev.svg" alt="" width={380} height={40} />
          <p className={`text-2xl font-semibold text-black py-1 ${isDarkMode ? "text-white" : "text-black"}`}>Kelvin Duche</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">
              Co-founder & Product Designer
            </p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* David face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Davy.png" alt="" width={380} height={40} />
          <p className={`text-2xl font-semibold text-black py-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            Akachukwu David
          </p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">
              Co-founder & Blockchain Dev
            </p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Izzy face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Izzy.png" alt="" width={380} height={40} />
          <p className={`text-2xl font-semibold text-black py-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            Isaac Onyemachi
          </p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">
              Co-founder & CTO
            </p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Stephen face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Stephen.png" alt="" width={380} height={40} />
          <p className={`text-2xl font-semibold text-black py-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            Steven Okosieme
          </p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">
              Product Manager
            </p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default Team;
