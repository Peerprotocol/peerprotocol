import React from "react";
import InfoTable from "./tableinfo";

const Transactiontable = () => {
  const tableData = [
    {
      TransactionType: "Lend",

      Market: "Samo",

      Amount: "$1,000,000",

      Netvalue: "$60,000",

      InterestRate: "3%",
    },
    {
      TransactionType: "Lend",

      Market: "Ninja",

      Amount: "$340,000",

      Netvalue: "$60,000",

      InterestRate: "3%",
    },
    {
      TransactionType: "Borrow",

      Market: "Myro",

      Amount: "$67,000",

      Netvalue: "$60,000",

      InterestRate: "3%",
    },
    {
      TransactionType: "Lend",

      Market: "Orca",

      Amount: "$500,000",

      Netvalue: "$60,000",

      InterestRate: "3%",
    },
    {
      TransactionType: "Borrow",

      Market: "Rin",

      Amount: "$80,000",

      Netvalue: "$60,000",

      InterestRate: "3%",
    },
  ];

  return (
    <div>
      <div className="bg-[#FFFFFF0D] my-6 h-96 mx-14">
        <div className="grid grid-cols-4 text-center h-full items-center border border-neutral-700 rounded-2xl">
          {tableData.map((info, index) => {
            let elements = [];
            if (index === 0) {
              elements.push(
                <InfoTable
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
              <InfoTable
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
    </div>
  );
};

export default Transactiontable;
