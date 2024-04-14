import React from "react";

interface TransactionProps {
  Transaction: string;
  Asset: string;
  Amount: string;
  Duration: string; 
  isHeader: boolean;
};

const TransactionTable: React.FC<TransactionProps> = ({ Transaction, Asset, Amount, Duration, isHeader})  =>  {
  const headerColor = isHeader ? "text-white": "";
    return (
      <>
        <p className={ `leading-10 text-[1.2rem] ${headerColor}`}>{Transaction}</p>
        <p className={`leading-10 text-[1.2rem] ${headerColor}`}>{Asset}</p>
        <h2 className={`leading-10 text-[1.2rem]  ${headerColor}`}>{Amount}</h2>
        <h1 className={`leading-10 text-[1.2rem] ${headerColor}`}>{Duration}</h1>
      </>
    );
  };
  
  export default TransactionTable;
  
