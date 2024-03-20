import React from "react";
import Navbar from "@/components/nav";
import Image from "next/image";
import DepCom from "@/components/dep_com";

const Borrowpage = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-center h-[calc(100%-55px-40px)] items-center">
      <DepCom/>
      </div>
    </div>
  );
};

export default Borrowpage;
