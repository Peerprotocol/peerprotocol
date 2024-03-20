import React from "react";
import Table from "./Table";
import { infoTableLabels } from "@/lib/data";
import { infoDataType } from "@/lib/types";


const InfoTable = ({ tableItems }: { tableItems: infoDataType[] }) => {
  return (
    <Table tableLabels={infoTableLabels} extraColumms={1}>
      {tableItems.map((item, index) => (
        <tr className="[*&>td]:py-4" key={index}>
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
