import Image from "next/image";
import React from "react";
import { MainMarketProps } from "./mainMarket";

interface MarketContentProps {
  marketData: MainMarketProps[];
  onAction: (action: "Lend" | "Borrow", data: Partial<MainMarketProps>) => void;
}

const MarketContent: React.FC<MarketContentProps> = ({ marketData, onAction }) => {
  return (
    <div className="w-full grid grid-cols-5 rounded-b-xl text-gray-800 cursor-pointer">
      {marketData.map((row, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col">
            <div className="text-left px-4 py-6 border-t border-gray-300">
              <div className="flex flex-col items-center mx-10 gap-1">
                <div className="flex items-center gap-3">
                  <Image
                    src={row.image}
                    height={30}
                    width={30}
                    alt={row.asset}
                  />
                  <span className="font-semibold text-lg">{row.asset}</span>
                </div>
                <p className="text-xs text-gray-500">{row.price}</p>
              </div>
            </div>
          </div>
          <div className="text-center px-4 py-6 border-t border-gray-300">
            <div className={`flex items-center gap-2 text-left justify-center ${row.cap >= 70 ? "ml-8" : ""}`}>
              <div>
                <p className="font-medium">{row.deposits}</p>
                <small className="text-gray-400">{row.maxTVL}</small>
              </div>
              <div>
                {row.cap >= 90 ? (
                  <Image
                    src={row.alert}
                    height={20}
                    width={15}
                    alt="alert image"
                  />
                ) : row.cap >= 70 ? (
                  <Image
                    src={row.caution}
                    height={20}
                    width={20}
                    alt="caution image"
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div className="text-center px-4 py-6 border-t border-gray-300">
            <p className="font-medium">{row.deposits}</p>
            <small className="text-gray-400">{row.maxTVL}</small>
          </div>
          <div className="text-center text-xs font-semibold text-gray-500 px-4 py-6 border-t border-gray-300">
            <button
              className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto"
              onClick={() => onAction("Lend", row)}
            >
              Lend
            </button>
            {row.supplyAPY}
          </div>
          <div className="text-center px-4 text-xs font-semibold text-gray-500 py-6 border-t border-gray-300">
            <button
              className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto"
              onClick={() => onAction("Borrow", row)}
            >
              Borrow
            </button>
            {row.borrowAPY}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MarketContent;
