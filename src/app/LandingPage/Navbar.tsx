"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/outline";

import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div>
      <nav className="flex items-center justify-between py-6 h-[15vh] bg-background text-text">
        <img
          src={isDarkMode ? "./images/logoWhite.svg" : "./images/logoBlack.svg"}
          width={40}
          height={40}
          alt=""
          className="w-10 lg:w-14"
        />

        <div className="lg:flex gap-24 hidden">
          <div className="flex gap-10">
            <div className="flex">
              <p className="cursor-pointer">Discord</p>
              <img src="./images/RightArrow.svg" alt="" />
            </div>
            <div className="flex">
              <p className="cursor-pointer">Twitter</p>
              <img src="./images/RightArrow.svg" alt="" />
            </div>
            <div className="flex">
              <p className="cursor-pointer">Blog</p>
              <img src="./images/RightArrow.svg" alt="" />
            </div>
          </div>
          <div className="flex gap-10">
            <a href="#Team">
              <p className="cursor-pointer">Team</p>
            </a>
            <Link
              href="https://app.gitbook.com/o/02QY6ijdm8nYPzf6caHW/s/MMuGCmhvKWQDxvmAvsYO/"
              target="_blank"
            >
              <div className="flex">
                <p className="cursor-pointer">Documentation</p>
                <img src="./images/RightArrow.svg" alt="" />
              </div>
            </Link>
            <div className="flex">
              <p className="cursor-pointer">Careers</p>
              <img src="./images/RightArrow.svg" alt="" />
            </div>
            <div className="flex">
              <p className="cursor-pointer">Reach Out</p>
              <img src="./images/RightArrow.svg" alt="" />
            </div>
          </div>
        </div>
        <div className="lg:flex items-center gap-6">
          <div className="flex gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`lg:border lg:block lg:border-current lg:px-6 px-2 border border-black  py-2 rounded-3xl flex items-center space-x-2 ${
                isDarkMode
                  ? "hover:bg-white hover:text-black"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              {isDarkMode ? (
                <>
                  <MoonIcon className="h-6 w-6" />
                </>
              ) : (
                <>
                  <SunIcon className="h-6 w-6" />
                </>
              )}
            </button>
            <button className="block lg:hidden text-gray-700">
              <MenuIcon className="w-8 h-8" />
            </button>
          </div>
          <Link href="/peerapp" target="_blank">
            <button
              className={`lg:border lg:block lg: border-current px-6 py-2 rounded-3xl hidden ${
                isDarkMode
                  ? "hover:bg-white hover:text-black"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              Launch App
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
