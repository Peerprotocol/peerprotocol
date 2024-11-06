"use client"
import React, { useState, useEffect } from 'react';
import Nav from "../Nav";
import Sidebar from "../sidebar";
import Image from "next/image";
import BackButton from "../../../../public/images/back-button.svg";
import Phantom from "../../../../public/images/phantom-icon.svg";
import PlusMath from "../../../../public/images/PlusMath.svg";
import PlusMathHover from "../../../../public/images/MathPlusHover.png";
import Solana from "../../../../public/images/sol.svg";
import PeerProtocol from "./../../../../public/images/LogoBlack.svg";
import Link from "next/link";
import { peerMarketData } from '../peerMarketData';
import { url } from 'inspector';
import { useSearchParams } from 'next/navigation';

interface Proposal {
  merchants: string;
  quantity: string;
  netValue: string;
  interestRate: number;
  duration: number;
}

const ITEMS_PER_PAGE = 7;

const Lender = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'counter'>('create');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [newProposal, setNewProposal] = useState<Proposal>({
    merchants: '',
    quantity: '',
    netValue: '',
    interestRate: 0,
    duration: 0
  });
  

  const totalPages = Math.ceil(proposals.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (type: 'create' | 'counter') => {
    setModalType(type);
    setModalOpen(true);
    setNewProposal({
      merchants: '',
      quantity: '',
      netValue: '',
      interestRate: 0,
      duration: 0
    });
  };

  const closeModal = () => setModalOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProposal(prev => ({
      ...prev,
      [name]: name === 'interestRate' || name === 'duration' ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    const randomMerchant = '0x' + Math.random().toString(16).substr(2, 8);
    const proposalWithMerchant = {
      ...newProposal,
      merchants: randomMerchant
    };
    setProposals(prev => [...prev, proposalWithMerchant]);
    closeModal();
  };

  const currentData = proposals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const [selectedCoin, setSelectedCoin] = useState(peerMarketData[Number(useSearchParams().get('data')) || 0]);

  return (
    <main className="bg-[#F5F5F5] backdrop-blur-sm">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col h-full max-h-screen overflow-auto">
          <Nav />
          <div className="flex p-4">
            <div className="flex gap-3">
              <div>
                <Link href='/app'>
                  <Image
                    src={BackButton}
                    height={40}
                    width={40}
                    alt="back-button"
                    className="cursor-pointer"
                  />
                </Link>
              </div>
              <div className="flex gap-2 pb-2">
                <p className="text-black text-4xl">Lend Market</p>
                <div className="flex gap-2 border rounded-3xl text-black border-gray-500 w-24 items-center justify-center">
                  <Image
                    src={selectedCoin.image}
                    height={20}
                    width={20}
                    alt={selectedCoin.asset}
                  />
                  <p className="text-xs">{selectedCoin.asset}</p>
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
              <div className="text-center font-semibold">Actions</div>
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
                  <div className="flex gap-6 justify-center items-center">
                    <button className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] text-white w-20 h-8">
                      Lend
                    </button>
                    <Image
                      src="/images/edit.svg"
                      alt="counter-proposal"
                      width={15}
                      height={20}
                      className="cursor-pointer"
                      onClick={() => openModal('counter')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end p-4">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 ${currentPage === index + 1
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

          <button
            onClick={() => openModal('create')}
            className="relative flex items-center gap-2 px-6 py-3 rounded-3xl bg-[#F5F5F5] text-black border border-[rgba(0,0,0,0.8)] mx-auto font-light hover:bg-[rgba(0,0,0,0.8)] hover:text-white"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p>Create a Proposal</p>
            <Image
              src={isHovered ? PlusMathHover : PlusMath}
              height={40}
              width={20}
              alt="plus"
              className="transition-opacity duration-300 ease-in-out"
            />
          </button>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
              <div className="bg-white rounded-xl w-1/3 h-[470px] relative pt-8">
                <button
                  className="absolute top-4 right-4 text-black text-xl"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <h2 className="text-center text-lg text-black">
                  {modalType === 'create' ? 'Create a Proposal' : 'Counter Proposal'}
                </h2>

                <div className="space-y-4 px-10 py-6">
                  <div>
                    <label className="text-sm text-gray-500 pl-2">Quantity</label>
                    <div className="p-3 border rounded-xl border-gray-600">
                      <input
                        type="text"
                        name="quantity"
                        value={newProposal.quantity}
                        onChange={handleInputChange}
                        className="w-full outline-none pl-8 text-black"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 pl-2">Duration (Days)</label>
                    <div className="p-3 border rounded-xl border-gray-600">
                      <input
                        type="number"
                        name="duration"
                        value={newProposal.duration}
                        onChange={handleInputChange}
                        className="w-full outline-none pl-8 text-black"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 pl-2">Interest Rate (%)</label>
                    <div className="flex flex-col items-center text-black">
                      <input
                        type="range"
                        name="interestRate"
                        min="0"
                        max="100"
                        value={newProposal.interestRate}
                        onChange={handleInputChange}
                        className="w-full h-2 rounded-lg cursor-pointer appearance-none focus:outline-none"
                        style={{
                          background: `linear-gradient(to right, #1e1e1e ${newProposal.interestRate}%, #e0e0e0 ${newProposal.interestRate}%)`,
                        }}
                      />
                      <div className="flex justify-between w-full text-black">
                        <span className="text-black font-medium">{newProposal.interestRate}%</span>
                        <input
                          type="number"
                          name="interestRate"
                          value={newProposal.interestRate}
                          onChange={handleInputChange}
                          className="border border-gray-300 mt-2 rounded p-1 w-16 text-center focus:outline-none focus:ring-0 focus:border-gray-400"
                          placeholder="Rate"
                        />
                      </div>
                      <style jsx>{`
                    input[type='range']::-webkit-slider-thumb {
                      -webkit-appearance: none;
                      appearance: none;
                      width: 16px;
                      height: 16px;
                      background: #1e1e1e;
                      border-radius: 50%;
                      cursor: pointer;
                    }

                    input[type='range']::-moz-range-thumb {
                      width: 16px;
                      height: 16px;
                      background: #1e1e1e;
                      border-radius: 50%;
                      cursor: pointer;
                    }

                    input[type='range']::-ms-thumb {
                      width: 16px;
                      height: 16px;
                      background: #1e1e1e;
                      border-radius: 50%;
                      cursor: pointer;
                    }
                  `}</style>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pb-4">
                  <button
                    className="bg-[rgba(0,0,0,0.8)] text-white px-4 py-2 rounded-md"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>

                <div className="flex items-center gap-2 justify-center absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <small className="text-gray-500">
                    Powered By Peer Protocol
                  </small>
                  <Image
                    src={PeerProtocol}
                    height={20}
                    width={20}
                    alt="jupiter-logo"
                    className="opacity-50"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Lender;
