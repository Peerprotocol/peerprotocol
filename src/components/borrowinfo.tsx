import React from "react";

const InfoTable = ({ Borrower, Netvalue, Assets, Duration, InterestRate,isHeader}: {
    Borrower: any;
    Assets: any;
    Netvalue: any | null;
    InterestRate: any  | null;
    Duration: any | null;
    isHeader: boolean;
})  =>  {
  const headerColor = isHeader ? "text-[#ffffff7e]": "";
    return (
      <>
        <p className={ `leading-10  ${headerColor}`}>{Borrower}</p>
        <p className={`tracking-widest ${headerColor}`}>{Assets}</p>
        <h2 className={`tracking-widest  ${headerColor}`}>{Netvalue}</h2>
        <h1 className={`leading-10 ${headerColor}`}>{InterestRate}</h1>
        <h1 className={`leading-10 ${headerColor}`}>{Duration}</h1>
      </>
    );
  };
  
  export default InfoTable;
  
