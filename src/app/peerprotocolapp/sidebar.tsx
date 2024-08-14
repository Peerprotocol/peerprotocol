import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="bg-black w-[15%] h-screen rounded-r-[3rem] py-8 flex flex-col sticky">
      <Image
        className="mx-[30%]"
        src="/images/LogoWhite.svg"
        width={50}
        height={20}
        alt="Logo"
      />
      <div className="mt-14 px-10 flex-1 flex flex-col">
        <div className="flex flex-col gap-14 flex-grow-[8]">
          <div className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/images/LogoWhite.svg"
              width={30}
              height={10}
              alt="Market"
            />
            <p>Market</p>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/images/liquid.svg"
              width={30}
              height={10}
              alt="Liquidity"
            />
            <p>Liquidity</p>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <Image src="/images/swap.svg" width={30} height={10} alt="Swap" />
            <p>Swap</p>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <Image src="/images/swap.svg" width={30} height={10} alt="Swap" />
            <p>Bridge</p>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <Image
              src="/images/portfolio.svg"
              width={30}
              height={10}
              alt="Market"
            />
            <p>Portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
