"use client";
import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";

const WaitList = () => {
    const [userType, setUserType] = useState("individual"); // State to track user type (individual/business)
    const [role, setRole] = useState("lender"); // State to track if the user is a lender or borrower

    // Input placeholders will change based on the selected userType
    const namePlaceholder = userType === "individual" ? "Fullname" : "Name of Company";
    const emailPlaceholder = userType === "individual" ? "Email" : "Company Email";

    return (
        <>
            <main className="bg-[url('/images/onlybg.svg')] h-screen text-black relative flex flex-col justify-center items-center">
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
                </Head>
                <div className="px-20 py-5 absolute top-0 left-0 z-20 flex items-center gap-3">
                    <Image src="/images/LogoBlack.svg" height={50} width={60} alt="backButton" />
                    <div className="mb-3">
                        <p className="font-semibold text-[1rem]">Peer</p>
                        <p className="text-[2rem] leading-4 font-bold">Protocol</p>
                    </div>
                </div>

                {/* Adjust z-index for form container */}
                <div className="flex flex-col justify-center items-center z-20">
                    <div className="text-center flex flex-col text-[8rem] font-semibold leading-[8rem]">
                        <span>GET</span>
                        <span className="relative">
                            <span className="relative inline-block mx-[10px]">
                                <span className="opacity-0">O</span> {/* Placeholder "O" */}
                                <span className="absolute inset-0 flex justify-center items-center">
                                    <Image src="/images/LogoBlack.svg" height={70} width={100} alt="LogoBlack" />
                                </span>
                            </span>
                            <span>NB</span>
                            <span className="relative inline-block mx-[10px]">
                                <span className="opacity-0">O</span> {/* Placeholder "O" */}
                                <span className="absolute inset-0 flex justify-center items-center">
                                    <Image src="/images/LogoBlack.svg" height={70} width={100} alt="LogoBlack" />
                                </span>
                            </span>
                            <span>ARD</span>
                        </span>
                    </div>

                    <div className="text-center mt-5">
                        <span className="text-[40px] tracking-widest raleway-regular">Join The Waitlist</span>
                        <div className="text-center max-w-[600px] mx-auto mt-2">
                            <p>Sign up and follow for updates about Mainnet launch, integrations, product launches, and the future of Peer Protocol.</p>
                        </div>
                    </div>

                    {/* Toggle between Individual and Business */}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => setUserType("individual")}
                            className={`px-4 py-2 mx-2 rounded-2xl ${userType === "individual" ? "bg-black text-white" : "bg-gray-200"}`}
                        >
                            Individual
                        </button>
                        <button
                            onClick={() => setUserType("business")}
                            className={`px-4 py-2 mx-2 rounded-2xl ${userType === "business" ? "bg-black text-white" : "bg-gray-200"}`}
                        >
                            Business
                        </button>
                    </div>

                    {/* Form inputs */}
                    <div className="mt-4">
                        <div className="my-3 rounded-3xl border border-black">
                            <input
                                placeholder={namePlaceholder}
                                type="text"
                                name="name"
                                id="name"
                                className="w-[30rem] py-3 rounded-3xl appearance-none outline-none px-5"
                            />
                        </div>
                        <div className="my-3 rounded-3xl border border-black">
                            <input
                                placeholder={emailPlaceholder}
                                type="email"
                                name="email"
                                id="email"
                                className="w-[30rem] py-3 rounded-3xl appearance-none outline-none px-5"
                            />
                        </div>

                        {/* Lender/Borrower Dropdown */}
                        <div className="my-3 rounded-3xl border border-black">
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-[30rem] py-3 rounded-3xl appearance-none outline-none px-5 bg-white"
                            >
                                <option value="lender">Lender</option>
                                <option value="borrower">Borrower</option>
                            </select>
                        </div>

                        <button className="bg-black w-[30rem] py-2 rounded-3xl">
                            <Image src="/images/LogoWhite.svg" height={25} width={25} alt="logo" className="mx-auto" />
                        </button>
                    </div>
                </div>

                {/* Lower z-index for background icons */}
                <div className="absolute inset-0 z-10">
                    <Image src="/images/bank.svg" height={30} width={30} alt="bank" className="absolute top-[10%] left-[30%] cursor-pointer" />
                    <Image src="/images/firm.svg" height={30} width={40} alt="firm" className="absolute top-[25%] left-[15%] cursor-pointer" />
                    <Image src="/images/security.svg" height={30} width={40} alt="security" className="absolute top-[50%] left-[12.5%] cursor-pointer" />
                    <Image src="/images/lend.svg" height={30} width={40} alt="lend" className="absolute top-[50%] right-[12.5%] cursor-pointer" />
                    <Image src="/images/burnt_xion.png" height={30} width={40} alt="blockchain" className="absolute top-[10%] right-[30%] cursor-pointer" />
                    <Image src="/images/credit.svg" height={30} width={40} alt="credit" className="absolute top-[25%] right-[15%] cursor-pointer" />
                    <Image src="/images/bag.svg" height={30} width={40} alt="bag" className="absolute left-[22%] bottom-[19%] cursor-pointer" />
                    <Image src="/images/sool.svg" height={30} width={40} alt="sool" className="absolute right-[22%] bottom-[19%] cursor-pointer" />
                </div>
            </main>
        </>
    );
};

export default WaitList;