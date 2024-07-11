import Image from "next/image";

const HeroPage = () => {
  return (
    <div className="">
      {/* <div className="text-current flex flex-col items-center lg:m-0 justify-center h-screen bg-background mt-[-12rem] border-2 border-green-500"> */}

      <div className="flex flex-col justify-center items-center relative w-full mx-auto h-[85vh] md:h-[85vh] sm:h-[50vh]">
        <p className="text-center sm:text-lg md:text-lg xl:block lg:text-2xl xl:mb-[-3rem]">
          First Decentralized{" "}
          <span className="xl:font-light xl:text-6xl lg:font-light lg:text-5xl font-notoserif text-xs">
            Peer-To-Peer
          </span>
        </p>
        <p className="lg:flex flex-row lg:m-0 text-center font-bold xl:text-[13rem] lg:text-[8rem] md:text-[6rem] sm:text-[4rem] sm:mt-[-2rem] relative text-[3.5rem] xl:mt-[-1rem] lg:mt-[-2rem] md:mt-[-2rem]">
          LENDING
        </p>

        {/* Protocol */}

        <p className="w-full xl:text-[13rem] sm:text-[5rem] font-bold flex items-center justify-center lg:mt-[-5rem] lg:text-[10rem] md:text-[8rem] md:mt-[-4rem] xl:mt-[-7rem] sm:mt-[-3rem]">
          PROT
          <div className="logo">
            <Image
              className="xl:w-[500px] lg:w-[160px] lg:h-[180px]"
              src="/images/LogoBlack.svg"
              width={500}
              height={500}
              alt=" "
            />
          </div>
          COL
          <style>{`
  .logo {
    width: 160px !important;
    height: auto;
  }

  @media (max-width: 1025px) {
    .logo {
      width: 120px !important;
    }
  }

  @media (max-width: 900px) {
    .logo {
      width: 100px !important;
      border: 1px solid red;
    }
  }
  @media (max-width: 500px) {
    .logo {
      width: 120px !important;
      border: 1px solid blue;
    }
  }
`}</style>
        </p>
        {/* all the position styles */}
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 xl:px-3 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute sm:border xl:top-[30%] xl:left-[20%] lg:top-[28%] origin-top-right rotate-[25deg] text-[0.3rem] font-semibold">
          Peer-to-Peer
        </p>
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 xl:px-6 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:top-[25%] xl:left-[41%] lg:top-[25%] lg:left-[41%]  origin-top-right rotate-[-20deg] text-[0.3rem] font-semibold">
          Autonomous
        </p>
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 xl:px-8 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:top-[30%] lg:top-[30%] right-[27%] origin-top-right rotate-[10deg] text-[0.3rem] font-semibold">
          Trustless
        </p>
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 xl:px-6 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute bottom-[35%] xl:bottom-[38%] lg:bottom-[48%] xl:left-[20%] lg:left-[9%] origin-top-right rotate-[0deg] text-[0.3rem]">
          Decentralized
        </p>
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 xl:px-6 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:bottom-[35%] xl:right-[16%] lg:bottom-[45%] right-[8%] origin-top-right rotate-[10deg] text-[0.3rem]">
          Interoperable
        </p>
        <p className="xl:max-w-[70%] mx-auto text-center opacity-60 md:w-[80%] md:text-sm sm:text-xs">
          Experience the power of decentralized finance, earn interest and
          unlock borrowing possibilities across a diverse range of assets and
          pools on our lightning-fast, cost-effective, and highly scalable
          peer-to-peer lending protocol.
        </p>
      </div>
      {/* </div> */}

      <div className="py-30 lg:m-0 xl:m-0 mx-auto bg-[#F5F5F5] text-text xl:mt-[1rem] mt-[-10rem] xl:w-full w-full px-32 md:mt-0 sm:m-0">
        <p className="font-bold lg:text-base text-sm text-center">
          Interoperable with
        </p>
        <div className="flex gap-8 lg:gap-32 mt-8 justify-center xl:px-32 xl:py-12 lg:py-12 md:py-12 sm:pb-9">
          <Image
            src="/images/solanalogo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
          <Image
            src="/images/xionlogo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
          <Image
            src="/images/starknetlogo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
          <Image
            src="/images/ethereumlogo.svg"
            width={100}
            height={0}
            alt=""
            className="w-16 lg:w-24"
          />
        </div>
        <div className="flex gap-8 lg:gap-20 justify-center">
          <Image
            src="/images/zksynclogo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
          <Image
            src="/images/layerzerologo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
          <Image
            src="/images/binancelogo.svg"
            width={200}
            height={0}
            alt=""
            className="w-16 lg:w-64 md:w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
