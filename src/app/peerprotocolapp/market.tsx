import { useState } from "react";
import Image from "next/image";

const Market = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Main Market");

  const options = ["Main Market", "Meme Market"];

  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const data = [
    {
      image: "./images/sol.svg",
      asset: "SOL",
      price: "$177.08",
      maxTVL: "$1,000,000",
      deposits: "$500,000",
      supplyAPY: "5%",
      borrowAPY: "3%",
    },
    {
      image: "./images/nyan.svg",
      asset: "NYAN",
      price: "$0.0632",
      maxTVL: "$800,000",
      deposits: "$400,000",
      supplyAPY: "4%",
      borrowAPY: "2.5%",
    },
    {
      image: "./images/tensor.svg",
      asset: "TNSR",
      price: "$0.43",
      maxTVL: "$600,000",
      deposits: "$300,000",
      supplyAPY: "6%",
      borrowAPY: "4%",
    },
    {
      image: "./images/kamino.svg",
      asset: "KMN",
      price: "$0.22",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
    {
      image: "./images/orca.svg",
      asset: "ORCA",
      price: "$2.05",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
    {
      image: "./images/zeta.svg",
      asset: "ZETA",
      price: "$0.06",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
    {
      image: "./images/wormhole.svg",
      asset: "W",
      price: "$0.33",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
    {
      image: "./images/zeus.svg",
      asset: "ZEUS",
      price: "$0.0004",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
    {
      image: "./images/drift.svg",
      asset: "DRIFT",
      price: "$0.20",
      maxTVL: "$1,200,000",
      deposits: "$700,000",
      supplyAPY: "3%",
      borrowAPY: "2%",
    },
  ];

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
        <div className="grid grid-cols-6 pt-6 rounded-t-xl bg-smoke-white py-4">
          <div className="text-center font-semibold">Asset</div>
          <div className="text-center font-semibold">Price</div>
          <div className="text-center font-semibold">Max TVL</div>
          <div className="text-center font-semibold">Deposits</div>
          <div className="text-center font-semibold">Supply APY</div>
          <div className="text-center font-semibold">Borrow APY</div>
        </div>
        <div className="w-full grid grid-cols-6 rounded-b-xl text-gray-800">
          {data.map((row, index) => (
            <>
              <div>
                <div
                  key={`${index}-asset`}
                  className="text-center px-4 py-6 border-t border-gray-300"
                >
                  <div className="flex items-center gap-3">
                  <Image src={row.image} height={30} width={30} alt="images"/>
                  {row.asset}
                  </div>
                </div>
              </div>
              <div
                key={`${index}-price`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                {row.price}
              </div>
              <div
                key={`${index}-maxTVL`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                {row.maxTVL}
              </div>
              <div
                key={`${index}-deposits`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                {row.deposits}
              </div>
              <div
                key={`${index}-supplyAPY`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <button className="px-6 py-2 rounded-3xl bg-[rgba(0,0,0,0.8)] text-white mr-2">Lend</button>
                {row.supplyAPY}
              </div>
              <div
                key={`${index}-borrowAPY`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <button className="px-6 py-2 rounded-3xl bg-[rgba(0,0,0,0.8)] text-white mr-2">Borrow</button>
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
