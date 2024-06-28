import React, { useState, useEffect } from "react";
import Table from "./Table";
import { infoTableLabels } from "@/lib/data";
import { useUserState } from "@/hooks/user_states";

const LendInfoTable = ({ tableItems }: { tableItems: any[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLendClick = (index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const [selectedPubKey, setSelectPubKey] = useState("");
  const {
    ellipsifyFirstLast,
    acceptLoan,
  
    publicKey,
    program,
  } = useUserState();

  let debt = 0;
  for (let i = 0; i < userDebt.length; i++) {
    debt += (userDebt[i] as any).account.amount.toNumber();
  }

  const newdebt = debt / 10 ** 6;
  const result = (newdebt / parseInt(deposit)) * 100;

  const acceptLoanIdx = async (item: any) => {
    if (result! <= 80) {
      setSelectPubKey(item.publicKey.toString());
      await acceptLoan(
        item.account.idx,
        item.publicKey.toString(),
        item.account.lender.toString(),
        (
          item.account.mintAddress ??
          "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
        ).toString()
      );
    } else {
      alert(
        "You have reached the maximum amount of debt you can take on. Please clear some of your debt before borrowing again"
      );
    }
  };

  useEffect(() => {
    if (tableItems && tableItems.length > 0) {
      setIsLoading(false);
    }
  }, [tableItems]);
  return isLoading ? (
    <div className="flex justify-center">Loading, Please wait...</div>
  ) : (
    <Table tableLabels={infoTableLabels} extraColumms={1}>
      {tableItems.map((item, index) => (
        <React.Fragment key={index}>
          <tr className="[*&>td]:py-4">
            <td>{ellipsifyFirstLast(item.account.lender.toString(), 5)}</td>
            <td>{item.assets ?? "USDC"}</td>
            <td>{item.account.amount.toString()}</td>
            <td>{item.account.interestRate}</td>
            <td>{item.account.duration.toString()}</td>
            <td>
              <button
                className="border border-white rounded-full p-3 px-6"
                onClick={() => handleLendClick(index)}
              >
                Lend
              </button>
            </td>
          </tr>
          {selectedRow === index && (
            <tr>
              <td colSpan={infoTableLabels.length + 1}>
                <div className="flex flex-row gap-4 h-[fit-content] bg-transparent p-4">
                  <div className="p-4 h-[fit-content] flex flex-col gap-4 w-[50%] bg-[#ffffff2c] rounded-xl">
                    <span className="flex flex-row justify-between">
                      <p>Author:</p>
                      <p>
                        {ellipsifyFirstLast(item.account.lender.toString(), 5)}
                      </p>
                    </span>
                    <span className="flex flex-row justify-between">
                      <p>Date created:</p>
                      <p>{item.account.duration.toString()}</p>
                    </span>
                    <span className="flex flex-row justify-between">
                      <p>Duration:</p>
                      <p>{item.account.duration.toString()}</p>
                    </span>
                  </div>
                  <div className="p-4 w-[50%] flex flex-col gap-4  bg-[#ffffff2c] rounded-xl ">
                    <span className="flex flex-row justify-between">
                      <div className="border rounded-full px-2 bg-[#ffffff15]">
                        <select className="text-white relative p-2 px-4 py-3 bg-[#ffffff00]">
                          <option value="option3">USDC</option>
                        </select>
                      </div>
                      <p>
                        {ellipsifyFirstLast(item.account.lender.toString(), 5)}
                      </p>
                    </span>
                    <span className="flex flex-row justify-between">
                      <p>Interest Rate</p>
                      <p>{item.account.interestRate.toString()}%</p>
                    </span>
                    <span className="flex flex-row items-end justify-end">
                      <button
                        className="self-end border border-white rounded-full p-3 px-6"
                        onClick={(e) => acceptLoanIdx(item)}
                      >
                        Accept Proposal +
                      </button>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </Table>
  );
};

export default LendInfoTable;
