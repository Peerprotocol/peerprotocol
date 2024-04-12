"use client";

import React from "react";
import InfoTable from "./borrowinfo";
import { tableData } from "@/lib/data";
import Pagination from "./Pagination";
import usePagination from "@/lib/hooks/usePagination";
import { infoDataType } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/constants";
import { BN } from "@project-serum/anchor";
import { useUserState } from "@/hooks/user_states";

const BorrowComponent = () => {
  const {
    initializeUser,
    transactionPending,
    initialized,
    loading,
    deposit,
    lent,
    depositCollaterial,
    loans,
  } = useUserState();

  console.log(
    loans.filter((loan: any) => {
      console.log(loan.publicKey.toString());
      console.log(loan.account.amount);
      return true;
    })
  );

  const {
    paginatedItems: paginatedTableData,
    totalPages,
    setPage,
    currentPage,
  } = usePagination<infoDataType>(1, tableData, PAGE_SIZE);

  return (
    <div className="w-full">
      <div className="bg-[#FFFFFF0D] p-4 rounded-xl mb-3 pb-6">
        <InfoTable
          tableItems={loans.filter(
            (loan: any) => "open" in loan.account.status
          )}
        />
      </div>
      <div className="flex justify-end">
        <Pagination
          setPage={setPage}
          lastPage={totalPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default BorrowComponent;
