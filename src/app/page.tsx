"use client";
import React, { useState, useContext, useEffect } from "react";
import Navbar from "./LandingPage/Navbar";
import HeroPage from "./LandingPage/HeroSection";
import Features from "./LandingPage/Features";
import About from "./LandingPage/About";
import Team from "./LandingPage/TeamPage";
import Onboard from "./LandingPage/Onboard";
import BlogPost from "./LandingPage/Blog";
import Footer from "./LandingPage/Footer";
import { DarkModeContext } from "./LandingPage/DarkMode";

function Landing() {
  const { isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {}, [isDarkMode]);
  return (
    <div className={`${isDarkMode ? "bg-[#0d101711]" : "bg-[#F5F5F5]"} w-full`}>
      <section
        className={`${
          isDarkMode
            ? "bg-black text-white lg:px-8"
            : "bg-white text-black lg:px-8"
        } lg:px-8 px-3`}
      >
        <Navbar />
        <HeroPage />
        <Features />
        <About />
        <Team />
      </section>
      <Onboard />
      <div
        className={`${
          isDarkMode ? "bg-[#0d101711]" : "bg-[#F5F5F5]"
        } xl:flex md:grid grid-cols-2 md:px-9 md:gap-6 my-32 block`}
      >
        {Array.from({ length: 4 }, (_, index) => (
          <BlogPost key={index} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
