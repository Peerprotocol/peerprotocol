import Image from "next/image";

const HeroPage = () => {
  return (
    <div className="">
      {/* <div className="text-current flex flex-col items-center lg:m-0 justify-center h-screen bg-background mt-[-12rem] border-2 border-green-500"> */}

      <h1 className="flex flex-col justify-center items-center relative w-full mx-auto h-[85vh] md:h-[85vh] sm:h-[50vh]">
        <h1 className="text-center sm:text-lg md:text-lg xl:block lg:text-2xl xl:mb-[-3rem]">
          First Decentralized{" "}
          <span className="xl:font-light xl:text-6xl lg:font-light lg:text-5xl font-notoserif text-xs">
            Peer-To-Peer
          </span>
        </h1>
        <p className="lg:flex flex-row lg:m-0 text-center font-bold xl:text-[13rem] lg:text-[8rem] md:text-[6rem] sm:text-[3.5rem] sm:mt-[-1rem] relative text-[2.5rem] xl:mt-[-1rem] lg:mt-[-2rem] md:mt-[-2rem]">
          LENDING
        </p>

        {/* Protocol */}

        <h1 className="w-full xl:text-[13rem] sm:text-[3.5rem] font-bold flex items-center justify-center lg:mt-[-5rem] lg:text-[10rem] md:text-[8rem] md:mt-[-4rem] xl:mt-[-7rem] sm:mt-[-2rem]">
          PROT
          <div className=" mt-[10px] xl:w-[150px] lg:w-[120px] md:w-[100px] h-auto w-[8rem] sm:w-10">
            <Image
              src="/images/LogoBlack.svg"
              width={500}
              height={500}
              alt=""
              className="w-full h-full"
            />
          </div>
          COL
        </h1>
        {/* all the position styles */}
        <p className="bg-[#e7e7e7] border border-black lg:font-normal text-current 2xl:left-[20%] 2xl:px-3 2xl:top-[32%] px-2 xl:px-3 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute sm:border xl:top-[28%] xl:left-[15%] lg:top-[34%] lg:left-[19%] md:top-[34%] md:left-[20%] md:text-[8px] origin-top-right rotate-[25deg] text-[0.3rem] font-semibold sm:top-[32%] sm:left-[5%] sm:px-1 sm:py-[0.2rem]">
          Peer-to-Peer
        </p>
        <p className="bg-[#e7e7e7] border border-black lg:font-normal text-current px-2 2xl:left-[41%] 2xl:px-3 2xl:top-[28%] xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:top-[20%] xl:text-[18px] xl:left-[40%] lg:top-[30%] lg:text-[12px] lg:right-[51%] md:left-[41%] md:top-[31%] md:text-[8px] origin-top-right rotate-[-20deg] text-[0.3rem] font-semibold sm:top-[30%] sm:left-[36%] sm:py-[0.2rem] sm:px-[0.2rem]">
          Autonomous
        </p>
        <p className="bg-[#e7e7e7] border border-black lg:font-normal text-current px-2 xl:px-8 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:top-[30%] lg:top-[33%] lg:text-[12px] lg:px-5 lg:right-[25%] md:top-[34%] md:right-[27%] md:text-[8px] right-[27%] origin-top-right rotate-[10deg] text-[0.3rem] font-semibold sm:top-[32%] sm:right-[15%] sm:py-[0.2rem]">
          Trustless
        </p>
        <p className="bg-[#e7e7e7] border border-black 2xl:left-[20%] lg:font-normal text-current px-2 xl:px-6 xl:text-lg lg:text-[13px] py-1 lg:py-2 rounded-3xl absolute bottom-[35%] xl:bottom-[38%] lg:bottom-[42%] xl:left-[15%] lg:left-[12%] md:bottom-[48%] md:font-semibold md:left-[10%] md:text-[10px] origin-top-right rotate-[0deg] text-[0.3rem] sm:left-[6%] sm:bottom-[51.5%] sm:py-[0.2rem] sm:px-1">
          Decentralized
        </p>
        <p className="bg-[#e7e7e7] lg:font-normal text-current px-2 border border-black 2xl:right-[18%] 2xl:bottom-[33%] 2xl:w-fit xl:px-6 xl:text-lg lg:text-xs py-1 lg:py-2 rounded-3xl absolute xl:bottom-[30%] xl:right-[12%] md:right-[8%] md:bottom-[45%] md:text-[10px] lg:bottom-[38%] lg:right-[10%] right-[8%] origin-top-right rotate-[10deg] text-[0.3rem] sm:right-[4%] sm:py-[0.2rem]">
          Interoperable
        </p>
        <p className="xl:max-w-[70%] mx-auto text-center opacity-60 md:w-[80%] md:text-sm sm:text-xs">
          Experience the power of decentralized finance, earn interest and
          unlock borrowing possibilities across a diverse range of assets and
          pools on our lightning-fast, cost-effective, and highly scalable
          peer-to-peer lending protocol.
        </p>
      </h1>
      {/* </div> */}
      <p className="font-bold lg:text-base text-sm text-center">
          Interoperable with
        </p>

      <div className="py-30 lg:m-0 xl:m-0 mx-auto bg-[#F5F5F5] text-text xl:mt-[1rem] mt-[-10rem] xl:w-full w-full px-32 md:mt-0 sm:m-0 sm:pb-10">
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
