"use client";
import CreateproposalComponent from "@/components/CreateproposalComponent";
import { WalletConnectProvider } from "@/components/WalletConnectProvider";
import BorrowComponent from "@/components/borrowComponent";
import Navbar from "@/components/nav";
import Link from "next/link";
import React, {useState} from "react";

const Borrow = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
    
  return (
    <WalletConnectProvider>
      <div className="flex flex-col">
        <Navbar />

        <section className="max-w-7xl mx-auto w-full px-4 py-2">
          <div className="flex flex-row h-[4rem] w-full items-center justify-between px-4 py-2 mb-4 rounded-xl bg-[#FFFFFF0D] ">
            <span className="flex flex-row justify-evenly w-[12%]">
              <Link href="/borrow">Borrow {}</Link>
              <Link href="/lend">Lend</Link>
            </span>
            <span className="flex flex-row justify-evenly w-[30%] text-white bg-transparent">
              <select name="filter" aria-readonly className="bg-black text-white">
                <option value="filter">Filter</option>
              </select>
              <select name="token" className="bg-black text-white">
                <option value="token">Token</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
                <option value="STEP">STEP</option>
              </select>
              <select name="rate" className="bg-black text-white">
                <option value="rate">Rate</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
                <option value="5%">5%</option>
              </select>
              <select name="duration" className="bg-black text-white">
                <option value="Duration">Duration</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
                <option value="7days">7 Days</option>
              </select>
            </span>
          </div>
          <BorrowComponent />
        </section>
          <button
              className="mx-auto border border-white rounded-full p-3 px-6"
              onClick={handleOpenModal}
            >
              Create Proposal +
            </button>
 
          <CreateproposalComponent show={showModal} onClose={handleCloseModal}/>
        </div>
    </WalletConnectProvider>
  );
};

export default Borrow;
