import React, { useState } from "react";
import Table from "./Table";
import { infoTableLabels } from "@/lib/data";
import { useUserState } from "@/hooks/user_states";
// import { infoDataType } from "@/lib/types";

const InfoTable = ({ tableItems }: { tableItems: any[] }) => {
  const { ellipsifyFirstLast, acceptLoan, transactionPending } = useUserState();
  const acceptLoanIdx = async (item: any) => {
    console.log(item.account.idx, item.publicKey.toString());
    await acceptLoan(
      item.account.idx,
      item.publicKey.toString(),
      item.account.lender.toString(),
      item.account.mintAddress.toString()
    );
  };
  return (
    <Table tableLabels={infoTableLabels} extraColumms={1}>
      {tableItems.map((item, index) => (
        <tr className="[*&>td]:py-4" key={index}>
          <td>{ellipsifyFirstLast(item.account.lender.toString(), 5)}</td>
          <td>{item.assets ?? "USDC"}</td>
          <td>{item.account.amount.toString()}</td>
          <td>{item.account.interestRate}</td>
          <td>{item.account.duration.toString()}</td>
          <td>
            <button
              className="border border-white rounded-full p-3 px-6"
              onClick={(e) => acceptLoanIdx(item)}
            >
              {transactionPending ? "Pending" : "Borrow"}
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default InfoTable;
