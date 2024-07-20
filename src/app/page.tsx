import React from "react";
import Navbar from "./LandingPage/Navbar";
import HeroPage from "./LandingPage/HeroSection";
import Features from "./LandingPage/Features";
import About from "./LandingPage/About";
import Team from "./LandingPage/TeamPage";
import Onboard from "./LandingPage/Onboard";
import BlogPost from "./LandingPage/Blog";
import Footer from "./LandingPage/Footer";
const Page = () => {
  return (
    <div className="bg-[#F5F5F5] w-full">
      <div className="lg:px-8 px-3">
        <Navbar />
        <HeroPage />
        <Features />
        <About />
        <Team />
      </div>
      <Onboard />
      <div className="xl:flex md:grid grid-cols-2 md:px-9  md:gap-6 my-32 block">
        {Array.from({ length: 4 }, (_, index) => (
          <BlogPost key={index} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Page;
