import React, { createContext } from "react";
import Image from "next/image";
// import { motion } from "framer-motion";
import Link from "next/link";

function Landing() {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: 'url("/images/hero.svg")' }}
    >
      <div className="px-8 pt-6 mx-12 h-screen">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/images/logo.svg"
              alt="Description of the image"
              width={55}
              height={55}
            />
            <p className="text-xl font-semibold">Peer Protocol</p>
          </div>

          <div className="flex gap-20">
            <p className="cursor-pointer">Home</p>
            <p className="cursor-pointer">Team</p>
            <p className="cursor-pointer">FAQ</p>
            <p className="cursor-pointer">Documentation</p>
          </div>

          <Link href="/peerapp">
            {/* <a> */}
            <button className="border-white border-2 rounded-3xl p-3 relative overflow-hidden transition duration-300 hover:bg-gradient-to-r from-green-400 to-purple-700">
              <span className="relative z-10">Launch App</span>
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-400 to-purple-600 opacity-0 transition-opacity duration-300 hover:opacity-100"></span>
            </button>
            {/* </a> */}
          </Link>
        </div>
        <div className="flex justify-around items-center">
          <div>
            <p className="text-6xl font-sans font-semibold w-4/5 leading-tight">
              First decentralized peer-to-peer lending protocol
            </p>
            <div className="flex gap-3 mt-2 mb-2">
              <p>Powered by</p>
              <Image
                src="/images/solana.svg"
                alt="Description of the image"
                width={80}
                height={5}
              />
            </div>
            <p className="w-8/12 text-sm mt-2">
              Experience the power of decentralized finance: Earn interest and
              unlock borrowing possibilities across a diverse range of assets
              and pools on our lightning-fast, cost-effective, and highly
              scalable peer-to-peer lending protocol.
            </p>
          </div>
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 360 }}
            transition={{
              delay: 0.6,
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }} */}
          {/* > */}
          <img
            className="relative"
            src="/images/world.svg"
            alt="World"
            width={2000}
          />
          <Image
            className="absolute"
            src="/images/myro.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          <Image
            className="absolute top-[8rem] left-[75rem]"
            src="/images/step.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          <Image
            className="absolute bottom-[35rem] left-[55rem]"
            src="/images/jup.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          <Image
            className="absolute bottom-[20rem] left-[88rem]"
            src="/images/raydium.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          <Image
            className="absolute top-[42rem] right-[20rem]"
            src="/images/wif.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          <Image
            className="absolute top-[40rem] left-[55rem]"
            src="/images/bonk.png"
            alt="Box Icon"
            width={100}
            height={20}
          />
          {/* </motion.div> */}
        </div>
      </div>

      <div className="bg-[#0F0F0F]">
        <div className="flex h-80 justify-between items-center mx-40">
          <div className="w-64 flex flex-col items-center">
            <Image
              className="mb-3"
              src="/images/boxicon.svg"
              alt="Box Icon"
              width={80}
              height={20}
            />
            <p className="text-xl font-semibold text-center">
              Transparent Marketplace
            </p>
            <p className="text-center text-sm mt-2">
              Transparent marketplace, providing borrowers with real-time deals
              and ensuring trustworthy transactions.
            </p>
          </div>

          <div className="w-64 flex flex-col items-center">
            <Image
              className="mb-3"
              src="/images/waterdropicon.svg"
              alt="Water Drop Icon"
              width={80}
              height={20}
            />
            <p className="text-xl font-semibold text-center">
              User-Centric Interface
            </p>
            <p className="text-center text-sm mt-2">
              Transparent marketplace, providing borrowers with real-time deals
              and ensuring trustworthy transactions.
            </p>
          </div>

          <div className="w-64 flex flex-col items-center">
            <Image
              className="mb-3"
              src="/images/dealicon.svg"
              alt="Deal Icon"
              width={80}
              height={20}
            />
            <p className="text-xl font-semibold text-center">
              Competitive Interest Rates
            </p>
            <p className="text-center text-sm mt-2">
              Experience decentralized lending with a balanced approach to
              interest rates & yield.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-evenly mt-20 mx-32 h-2/3">
        <div className="w-1/3">
          <p className="text-4xl">Gradual Liquidation process</p>
          <p className="text-xs leading-loose">
            Our platform employs a unique Gradual Liquidation feature, offering
            users a series of warnings and margin calls if their collateral
            approaches the liquidation threshold. This controlled process
            provides a grace period for users to address the situation,
            maintaining fairness. If necessary, the platform initiates a gradual
            liquidation, systematically selling collateral assets over time to
            ensure a fair market value and minimize disruption.
          </p>
        </div>
        <Image
          src="/images/laptop.svg"
          alt="Deal Icon"
          width={600}
          height={20}
        />
      </div>

      <div className="flex items-center justify-evenly mx-32 mt- h-2/3">
        <Image src="/images/peer.svg" alt="Deal Icon" width={600} height={20} />
        <div className="w-1/3">
          <p className="text-4xl">Gradual Liquidation process</p>
          <p className="text-xs leading-loose">
            Our platform employs a unique Gradual Liquidation feature, offering
            users a series of warnings and margin calls if their collateral
            approaches the liquidation threshold. This controlled process
            provides a grace period for users to address the situation,
            maintaining fairness. If necessary, the platform initiates a gradual
            liquidation, systematically selling collateral assets over time to
            ensure a fair market value and minimize disruption.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-evenly mx-32 mt-2 h-2/3">
        <div className="w-1/3">
          <p className="text-4xl">Gradual Liquidation process</p>
          <p className="text-xs leading-loose">
            Our platform employs a unique Gradual Liquidation feature, offering
            users a series of warnings and margin calls if their collateral
            approaches the liquidation threshold. This controlled process
            provides a grace period for users to address the situation,
            maintaining fairness. If necessary, the platform initiates a gradual
            liquidation, systematically selling collateral assets over time to
            ensure a fair market value and minimize disruption.
          </p>
        </div>
        <Image src="/images/box.svg" alt="Deal Icon" width={600} height={20} />
      </div>

      <div className="mx-32 text-3xl mt-32">
        <p>Meet the team</p>
        <Image
          className="mx-auto"
          src="/images/team.svg"
          alt="Deal Icon"
          width={1000}
          height={7}
        />
      </div>

      <div className="h-64 flex flex-col justify-center items-center w-full bg-[#0F0F0F] mt-16">
        <div className="flex flex-col">
          <p className="text-3xl text-center">Join the waitlist</p>
          <p className="text-center">Enter your email address</p>
          <div className="w-full h-[fit-content] px-4 py-2 mx-auto relative flex items-center">
            <input
              className="h-12 relative w-full border rounded-full pl-8 bg-black placeholder-gray-400 placeholder-opacity-45"
              placeholder="Enter your Email address"
              type="email"
              name=""
              id=""
              style={{
                width: "800px",
                height: "60px",
                color: "white",
                fontSize: "12px",
              }}
            />
            <button className="border border-white p-2 rounded-full absolute right-10 transition duration-300 hover:bg-gradient-to-r from-purple-600 to-green-400">
              Join waitlist
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between h-40 items-center mx-32">
        <div className="cursor-pointer">
          <p>Copyright @PeerProtocol</p>
          <p>All Rights Reserved</p>
        </div>
        <div className="flex gap-2">
          <Image
            className="cursor-pointer"
            src="/images/linkedin.svg"
            alt="Deal Icon"
            width={30}
            height={1}
          />

          <Image
            className="cursor-pointer"
            src="/images/twitter.svg"
            alt="Deal Icon"
            width={30}
            height={1}
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
