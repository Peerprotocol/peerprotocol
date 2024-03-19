import React from "react";
import Table from "./Table";
import { infoTableLabels } from "@/lib/data";
import { infoDataType } from "@/lib/types";

// const InfoTable = ({ Borrower, Netvalue, Assets, Duration, InterestRate,isHeader}: {
//     Borrower: any;
//     Assets: any;
//     Netvalue: any | null;
//     InterestRate: any  | null;
//     Duration: any | null;
//     isHeader: boolean;
// })  =>  {
//   const headerColor = isHeader ? "text-[#ffffff7e]": "";
//     return (
//       <>
//         <p className={ `leading-10  ${headerColor}`}>{Borrower}</p>
//         <p className={`tracking-widest ${headerColor}`}>{Assets}</p>
//         <h2 className={`tracking-widest  ${headerColor}`}>{Netvalue}</h2>
//         <h1 className={`leading-10 ${headerColor}`}>{InterestRate}</h1>
//         <h1 className={`leading-10 ${headerColor}`}>{Duration}</h1>
//       </>
//     );
//   };

const InfoTable = ({ tableItems }: { tableItems: infoDataType[] }) => {
  return (
    <Table tableLabels={infoTableLabels} extraColumms={1}>
      {tableItems.map((item) => (
        <tr className="[*&>td]:py-4">
          <td>{item.borrower}</td>
          <td>{item.assets}</td>
          <td>{item.netvalue}</td>
          <td>{item.interestRate}</td>
          <td>{item.duration}</td>
          <td>
            <button className="border border-white rounded-full p-3 px-6">
              Borrow
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default InfoTable;
