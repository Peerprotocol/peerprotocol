"use client";

import React, { useContext, useEffect } from "react";
import InfoTable from "./borrowinfo";
import { tableData } from "@/lib/data";
import Pagination from "./Pagination";
import usePagination from "@/lib/hooks/usePagination";
import { infoDataType } from "@/lib/types";
import { PAGE_SIZE } from "@/lib/constants";
import { BN } from "@project-serum/anchor";
// import { UserContext } from "./WalletConnectProvider";

const BorrowComponent = () => {
  // const pState = useContext(UserContext);

  const {
    paginatedItems: paginatedTableData,
    totalPages,
    setPage,
    currentPage,
  } = usePagination<infoDataType>(1, tableData, PAGE_SIZE);

  return (
    <div className="w-full">
      {/* <div className="bg-[#FFFFFF0D] p-4 rounded-xl mb-3 pb-6">
        <InfoTable
          // tableItems={pState.availableLoans.filter(
            (loan: any) => "open" in loan.account.status
          )}
        />
      </div> */}
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