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
    <div className="bg-important">
      <div className="lg:px-8 px-3">
        <Navbar />
        <HeroPage />
        <Features />
        <About />
        <Team />
      </div>
      <Onboard />
      <div className="lg:flex justify-between my-32 block">
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <BlogPost />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
