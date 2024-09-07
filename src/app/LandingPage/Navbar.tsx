"use client";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState, useContext } from "react";
import Image from "next/image";
import { DarkModeContext } from "./DarkMode";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isDarkMode, toggleDark } = useContext(DarkModeContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="sm:flex text-sm xl:text-lg font-light lg:text-md items-center justify-between py-6 xl:h-[15vh] md:h-[15vh]">
        <img
          src={isDarkMode ? `/images/LogoWhite.svg` : `/images/LogoBlack.svg`}
          width={40}
          height={40}
          alt=""
          className="md:w-10 xl:w-14 w-4 sm:w-8"
        />

        <div className="lg:flex text-current hidden items-center gap-10 text-md">
          <div className="flex gap-5">
            <div className="flex items-center">
              <p className="cursor-pointer">Discord</p>
              <Image
                src="/images/RightArrow.svg"
                width={25}
                height={25}
                alt="Arrow"
              />
            </div>
            <div className="flex items-center">
              <p className="cursor-pointer">Twitter</p>
              <Image
                src="/images/RightArrow.svg"
                width={25}
                height={25}
                alt="Arrow"
              />
            </div>
            <div className="flex items-center">
              <p className="cursor-pointer">Blog</p>
              <Image
                src="/images/RightArrow.svg"
                width={25}
                height={25}
                alt="Arrow"
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="#Team">
              <p className="cursor-pointer">Team</p>
            </a>
            <Link
              href="https://app.gitbook.com/o/02QY6ijdm8nYPzf6caHW/s/MMuGCmhvKWQDxvmAvsYO/"
              target="_blank"
            >
              <div className="flex items-center">
                <p className="cursor-pointer">Documentation</p>
                <Image
                  src="/images/RightArrow.svg"
                  width={25}
                  height={25}
                  alt="Arrow"
                />
              </div>
            </Link>
            <div className="flex items-center">
              <p className="cursor-pointer">Careers</p>
              <Image
                src="/images/RightArrow.svg"
                width={25}
                height={25}
                alt="Arrow"
              />
            </div>
            <div className="flex items-center">
              <p className="cursor-pointer">Reach Out</p>
              <Image
                src="/images/RightArrow.svg"
                width={25}
                height={25}
                alt="Arrow"
              />
            </div>
          </div>
        </div>

        <div className="lg:flex items-center md:gap-6 md:flex flex gap-1">
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="block lg:hidden text-gray-700"
            >
              {menuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-8 w-8" />
              )}
            </button>

            <div
              className={`fixed top-0 right-0 h-full w-full shadow-lg z-50 transform transition-transform duration-300 ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              } ${isDarkMode ? "bg-[#0F0F0F]" : "bg-white"}`}
            >
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-700"
              >
                <XIcon className="h-6 w-6" />
              </button>

              <ul
                className={`p-4 my-16 text-center leading-[4rem] text-2xl ${
                  isDarkMode ? "text-white bg-[#0F0F0F]" : "text-black"
                }`}
              >
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Discord</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Twitter</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Blog</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
                <li className="cursor-pointer">Team</li>
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Documentation</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Careers</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
                <li className="flex items-center justify-center">
                  <p className="cursor-pointer">Reach Out</p>
                  <Image
                    src={
                      isDarkMode
                        ? "/images/DarkModeArrow.svg"
                        : "/images/RightArrow.svg"
                    }
                    width={25}
                    height={25}
                    alt="Arrow"
                  />
                </li>
              </ul>
            </div>
          </div>
          <Link href="/peerprotocolapp" target="_blank">
            <button
              className={`md:border text-md md:block md:border-current px-6 py-2 text-md rounded-3xl hidden ${
                isDarkMode
                  ? "hover:bg-white hover:text-black"
                  : "hover:bg-black hover:text-white"
              }`}
            >
              Launch
            </button>
          </Link>
          <button
            onClick={toggleDark}
            className={`md:border border-black px-1 py-1 rounded-full flex items-center space-x-2 ${
              isDarkMode
                ? "hover:bg-white hover:text-black bg-black text-white"
                : "hover:bg-black hover:text-white bg-white text-black"
            }`}
          >
            {isDarkMode ? (
              <MoonIcon className="w-8 h-8" />
            ) : (
              <SunIcon className="w-8 h-8" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;