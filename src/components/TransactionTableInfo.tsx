import React from "react";

interface TransactionProps {
  TransactionType: string;
  Market: string;
  Amount: string;
  InterestRate: string; 
  isHeader: boolean;
};

const TransactionTable: React.FC<TransactionProps> = ({ TransactionType, Market, Amount, InterestRate, isHeader})  =>  {
  const headerColor = isHeader ? "text-[#ffffff7e]": "";
    return (
      <>
        <p className={ `leading-10 text-[1.2rem] ${headerColor}`}>{TransactionType}</p>
        <p className={`tracking-widest text-[1.2rem] ${headerColor}`}>{Market}</p>
        <h2 className={`tracking-widest text-[1.2rem]  ${headerColor}`}>{Amount}</h2>
        <h1 className={`leading-10 text-[1.2rem] ${headerColor}`}>{InterestRate}</h1>
      </>
    );
  };
  
  export default TransactionTable;
  
