"use client";
import DepositWithdrawPeer from './DepositWithdrawPeer';
import React, { useState } from 'react';
import Nav from "../Nav";
import Sidebar from "../sidebar";
import Dashboard from '../../peerprotocolapp/userProfile/Dashboard';
import Table from './Table';
import Footer from '../footer';
import CryptoAnalyticsChart from './CryptoAnalyticsChart';

const UserProfile = () => {
  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Nav />
          <div className='flex gap-6 py-6 px-8'>
            <div className="flex-grow basis-[70%] flex">
              <Dashboard />
            </div>
            <div className="flex-grow basis-[30%] flex">
              <DepositWithdrawPeer />
            </div>
          </div>
          <CryptoAnalyticsChart/>
          <Table />
          <Footer/>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;