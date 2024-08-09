"use client";
import Nav from "../Nav";
import Sidebar from "../sidebar";
import Image from "next/image";
import BackButton from "../../../../public/images/back-button.svg";
import Phantom from "../../../../public/images/phantom-icon.svg";
import Solana from "../../../../public/images/sol.svg";
import { LenderData } from "../LenderData";
import { useState } from "react";

const ITEMS_PER_PAGE = 7;

const Lender = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(LenderData.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = LenderData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="bg-[#F5F5F5]">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full max-h-screen overflow-auto">
          <Nav />
          <div className="flex p-4">
            <div className="flex gap-3 items-center">
              <Image
                src={BackButton}
                height={40}
                width={40}
                alt="back-button"
                className="cursor-pointer"
              />
              <div className="flex gap-2 pb-2">
                <p className="text-black text-4xl">Lend Market</p>
                <div className="flex gap-2 border rounded-3xl text-black border-gray-500 w-24 items-center justify-center">
                  <Image
                    src={Solana}
                    height={20}
                    width={20}
                    alt="solana-logo"
                  />
                  <p className="text-xs">Solana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto text-black border border-gray-300 mx-4 mb-4">
            <div className="grid grid-cols-6 pt-6 rounded-t-xl bg-smoke-white py-4">
              <div className="text-center font-semibold">Merchant</div>
              <div className="text-center font-semibold">Quantity</div>
              <div className="text-center font-semibold">Net Value</div>
              <div className="text-center font-semibold">Interest Rate</div>
              <div className="text-center font-semibold">Duration</div>
            </div>
            <div className="w-full">
              {currentData.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 border-t border-gray-300"
                >
                  <div className="flex items-center justify-center px-4 py-6">
                    <Image
                      src={Phantom}
                      height={20}
                      width={20}
                      alt="phantomicon"
                    />
                    <p className="font-medium ml-2">{row.merchants}</p>
                  </div>
                  <div className="text-center px-4 py-6">
                    <p className="font-medium">{row.quantity}</p>
                  </div>
                  <div className="text-center px-4 py-6">
                    <p className="font-medium">{row.netValue}</p>
                  </div>
                  <div className="text-center px-4 py-6">
                    <p className="font-medium">{row.interestRate}%</p>
                  </div>
                  <div className="text-center px-4 py-6">
                    <p className="font-medium">{row.duration} days</p>
                  </div>
                  <button className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] my-5 mx-auto text-white w-20 h-8">
                    Lend
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button className="px-6 py-3 rounded-3xl bg-[#F5F5F5] text-black border border-[rgba(0,0,0,0.8)] mx-auto font-light hover:bg-[rgba(0,0,0,0.8)] hover:text-white">
            Create a Proposal
          </button>

          <div className="flex justify-end p-4">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 ${
                    currentPage === index + 1
                      ? "bg-[rgba(0,0,0,0.8)] text-white"
                      : "bg-[#F5F5F5] text-black border-black border"
                  } rounded-lg`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Lender;
