import Image from "next/image";

const HeroPage = () => {
  return (
    <div>
      <div className="text-current flex flex-col items-center lg:m-0 justify-center h-[85vh] bg-background mt-[-12rem]">
        <p className="text-center lg:mb-[-4rem]">
          First Decentralized{" "}
          <span className="lg:font-light lg:text-6xl font-notoserif text-xs">
            Peer-To-Peer
          </span>
        </p>
        <p className="lg:flex flex-row lg:m-0 text-center font-bold lg:text-[13rem] relative text-[4rem] mt-[-1rem]">
          LENDING
        </p>
        <p className="lg:text-[13rem] font-bold flex items-center justify-center lg:mt-[-8rem] text-[4rem] mt-[-2rem]">
          PROT
          <div className="logo">
            <Image
              src="/images/LogoBlack.svg"
              width={500}
              height={500}
              alt=" "
            />
          </div>
          COL
          <style>{`
            .logo {
              width: 50px !important;
              height: auto;
            }

            @media (min-width: 1024px) {
              .logo {
                width: 160px !important;
              }
            }
          `}</style>
        </p>
        <p className="text-left text-[0.35rem] lg:text-base lg:w-[53%] opacity-60 lg:mt-[-3rem] w-[100%]">
          Experience the power of decentralized finance, earn interest and
          unlock borrowing possibilities across a diverse range of assets and
          pools on our lightning-fast, cost-effective, and highly scalable
          peer-to-peer lending protocol.
        </p>

        {/* all the position styles */}
        <p className="bg-secondary lg:font-normal text-current px-2 lg:px-3 py-1 lg:py-2 rounded-3xl absolute lg:top-[25rem] lg:left-[22rem] top-[14rem] left-[2rem] origin-top-right rotate-[25deg] text-[0.3rem] font-semibold lg:text-base">
          Peer-to-Peer
        </p>
        <p className="bg-secondary lg:font-normal text-current px-2 lg:px-6 py-1 lg:py-2 rounded-3xl absolute lg:top-[22rem] lg:right-[53rem] right-[12rem] top-[13rem] origin-top-right rotate-[-20deg] text-[0.3rem] font-semibold lg:text-base">
          Autonomous
        </p>
        <p className="bg-secondary lg:font-normal text-current px-2 lg:px-6 py-1 lg:py-2 rounded-3xl absolute bottom-[31rem] lg:bottom-[18rem] left-[1.5rem] lg:left-[20rem] origin-top-right rotate-[0deg] text-[0.3rem] lg:text-base">
          Decentralized
        </p>
        <p className="bg-secondary lg:font-normal text-current px-2 lg:px-6 py-1 lg:py-2 rounded-3xl absolute top-[18rem] lg:top-[36rem] right-[1.5rem] lg:right-[18rem] origin-top-right rotate-[10deg] text-[0.3rem] lg:text-base">
          Interoperable
        </p>
        <p className="bg-secondary lg:font-normal text-current px-2 lg:px-8 py-1 lg:py-2 rounded-3xl absolute top-[14rem] lg:top-[25rem] right-[4.5rem] lg:right-[29rem] origin-top-right rotate-[10deg] text-[0.3rem] font-semibold lg:text-base">
          Trustless
        </p>
      </div>

      <div className="py-30 lg:m-0 bg-background text-text mt-[-12rem]">
        <p className="font-bold lg:text-base text-sm text-center">Interoperable with</p>
        <div className="flex gap-8 lg:gap-32 mb-8 mt-8 justify-center">
          <Image
            src="/images/solanalogo.svg"
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
          />
          <Image
            src="/images/xionlogo.svg"
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
          />
          <Image
            src="/images/starknetlogo.svg"
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
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
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
          />
          <Image
            src="/images/layerzerologo.svg"
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
          />
          <Image
            src="/images/binancelogo.svg"
            width={160}
            height={0}
            alt=""
            className="w-16 lg:w-40"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
