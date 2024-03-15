import React from "react";
import Borrow from "../../components/borrow";
import Navbar from "@/components/nav";

const Borrowpage = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex justify-center h-[calc(100%-55px-40px)] items-center">
        <Borrow />
      </div>
    </div>
  );
};

export default Borrowpage;
