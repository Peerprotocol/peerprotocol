import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav role="navigation" className="flex justify-between mx-14 my-4">
      <div className="flex gap-3 items-center">
        <div>
          <Image
            src=".\images\logo.svg"
            alt="Description of the image"
            width={55}
            height={55}
          />
        </div>
        <p className="text-2xl">Peer Protocol</p>
      </div>
      <div className="flex">
        <div className="flex gap-16">
          <div className="flex items-center gap-8">
            <p>Portfolio</p>
            <p>Deposit/Withdraw</p>
            <p>Borrow/Lend</p>

            <div className="flex gap-2 border-solid border-2 rounded-3xl px-4 py-3 border-transparent  bg-[#ffffff13]">
              <div>
                <Image
                  src=".\images\phantom-img.svg"
                  alt="Description of the image"
                  width={25}
                  height={25}
                />
              </div>
              <p>0x94...03f</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
