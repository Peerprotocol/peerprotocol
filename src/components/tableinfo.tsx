import React from "react";

const InfoTable = ({ TransactionType, Market, Amount, InterestRate,isHeader}: {
    TransactionType: any;
    Market: any;
    Amount: any | null;
    InterestRate: any  | null; 
    isHeader: boolean;
})  =>  {
  const headerColor = isHeader ? "text-[#ffffff7e]": "";
    return (
      <>
        <p className={ `leading-10  ${headerColor}`}>{TransactionType}</p>
        <p className={`tracking-widest ${headerColor}`}>{Market}</p>
        <h2 className={`tracking-widest  ${headerColor}`}>{Amount}</h2>
        <h1 className={`leading-10 ${headerColor}`}>{InterestRate}</h1>
      </>
    );
  };
  
  export default InfoTable;
  
