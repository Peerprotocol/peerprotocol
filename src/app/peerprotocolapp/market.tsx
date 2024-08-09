import { useState } from "react";
import Image from "next/image";
import { marketData } from "./mainMarket";

const Market = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Main Market");

  const options = ["Main Market", "Meme Market"];

  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };


  return (
    <div className="p-8">
      <div className="relative text-left flex justify-between pt-20 pb-8">
        <p className="text-black text-3xl">Main Market</p>

        <div className="flex items-center gap-8">
          <div className="bg-gray-200 rounded-xl text-black flex gap-3 py-2 px-4 border">
            <p>Protocol</p>
            <p>P2P</p>
          </div>

          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-32 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectChange(option)}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      option === selectedOption
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto text-black border">
        <div className="grid grid-cols-7 pt-6 rounded-t-xl bg-smoke-white py-4">
          <div className="text-center font-semibold">Asset</div>
          <div className="text-center font-semibold">Price</div>
          <div className="text-center font-semibold">TVL</div>
          <div className="text-center font-semibold">Cap Limit</div>
          <div className="text-center font-semibold">Deposits</div>
          <div className="text-center font-semibold">Supply APY</div>
          <div className="text-center font-semibold">Borrow APY</div>
        </div>
        <div className="w-full grid grid-cols-7 rounded-b-xl text-gray-800">
          {marketData.map((row, index) => (
            <>
              <div>
                <div
                  key={`${index}-asset`}
                  className="text-left px-4 py-6 border-t border-gray-300"
                >
                  <div className="flex items-center mx-10 gap-3">
                  <Image src={row.image} height={30} width={30} alt="images"/>
                  {row.asset}
                  </div>
                </div>
              </div>
              <div
                key={`${index}-price`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <p className="font-semibold">{row.price}</p>
              </div>
              <div
                key={`${index}-maxTVL`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <p className="font-medium">{row.maxTVL}</p>
                <small className="text-gray-400">{row.cap}</small>
              </div>
              <div
                key={`${index}-cap`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                
                <p className="font-medium">{row.cap}</p>
              </div>
              <div
                key={`${index}-deposits`}
                className="text-center flex items-start justify-center gap-1 px-4 py-6 border-t border-gray-300"
              >
                <p className="font-medium">{row.deposits}</p>
                <Image src={row.alert} height={25} width={25} alt="images"/>
              </div>
              <div
                key={`${index}-supplyAPY`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <button className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto">Lend</button>
                {row.supplyAPY}
              </div>
              <div
                key={`${index}-borrowAPY`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <button className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto">Borrow</button>
                {row.borrowAPY}
              </div>
              
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;
