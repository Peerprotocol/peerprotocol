import React from "react";
import TransactionTable from "./TransactionTableInfo";
import { TransactionData } from "@/data/data";

const Transactiontable = () => {
  
  return (
      <div className="bg-[#FFFFFF0D] my-6 h-[fit-content] p-4 rounded-xl">
        <div className="grid grid-cols-4 text-center h-full px-6 py-3 justify-center place-items-center border border-neutral-700 rounded-xl">
          {TransactionData.map((info, index) => {
            let elements = [];
            if (index === 0) {
              elements.push(
                <TransactionTable
                  TransactionType={"TransactionType"}
                  key={index}
                  Market={"Market"}
                  Amount={"Amount"}
                  InterestRate={"InterestRate"}
                  isHeader={true}
                />
              );
            }
            elements.push(
              <TransactionTable
                isHeader={false}
                TransactionType={info.TransactionType}
                key={index}
                Market={info.Market}
                Amount={info.Amount}
                InterestRate={info.InterestRate}
              />
            );

            return <>{elements}</>;
          })}
        </div>
      </div>
  );
};

export default Transactiontable;
