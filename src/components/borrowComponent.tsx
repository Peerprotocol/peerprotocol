import React from "react";
import InfoTable from "./borrowinfo";


const BorrowComponent = () => {
  const tableData = [
    {
      Borrower: "Lend",

      Assets: "Samo",

      Netvalue: "$1,000,000",

      InterestRate: "3%",

      Duration: "7days"
    },
    {
        Borrower: "Lend",
  
        Assets: "Samo",
  
        Netvalue: "$1,000,000",
  
        InterestRate: "3%",
  
        Duration: "7days"
      },
      {
        Borrower: "Lend",
  
        Assets: "Samo",
  
        Netvalue: "$1,000,000",
  
        InterestRate: "3%",
  
        Duration: "7days"
      },
      {
        Borrower: "Lend",
  
        Assets: "Samo",
  
        Netvalue: "$1,000,000",
  
        InterestRate: "3%",
  
        Duration: "7days"
      }
  ];

  return (
    <div className="w-full">
      <div className="bg-[#FFFFFF0D] p-4 rounded-xl">
        <div className="grid grid-cols-5 text-center h-full items-center  rounded-2xl px-2 py-6 space-y-2">
          {tableData.map((info, index) => {
           let elements = [];
            if (index === 0) {
              elements.push(
                <InfoTable
                  Borrower={"Borrower"}
                  key={index}
                  Assets={"Assets"}
                  Netvalue={"Net Value ($)"}
                  InterestRate={"Interest Rate (%)"}
                  Duration={"Duration (Days)"}
                  isHeader={true}
                />
              );
            }
            elements.push(
              <InfoTable
                isHeader={false}
                Borrower={info.Borrower}
                key={index}
                Assets={info.Assets}
                Netvalue={info.Netvalue}
                InterestRate={info.InterestRate}
                Duration={info.Duration}
              />
            );

            return <>{elements}</>;
          })}
        </div>
      </div>
    </div>
  );
};

export default BorrowComponent;
