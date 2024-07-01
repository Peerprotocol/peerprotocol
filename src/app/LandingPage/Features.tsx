import Image from "next/image";

const Features = () => {
  return (
    <div className="bg-white flex flex-col lg:flex-row justify-center lg:gap-10 gap-6 xl:py-40 py-20 lg:my-32 lg:w-full">
      {/* Card 1 */}
      <div className="border-2 border-black lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-2 lg:mb-0 p-8">
        <Image src="./images/mybox.svg" width={40} height={40} alt="" className="lg:w-[40px] w-6"/>
        <p className="font-semibold text-black lg:py-3 p-1">Transparent Marketplace</p>
        <p className="text-black lg:text-base text-[1rem] tracking-wide text-sm">
          Transparent marketplace, providing borrowers with real-time deals and
          ensuring trustworthy transactions.
        </p>
      </div>

      {/* Card 2 */}
      <div className="border-2 border-black lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 mb-2 lg:mb-0 p-8">
        <Image src="./images/waterdrop.svg" width={40} height={40} alt="" className="lg:w-[40px] w-6"/>
        <p className="font-semibold text-black lg:py-3 p-1">Transparent Marketplace</p>
        <p className="text-black lg:text-base text-[1rem] tracking-wide text-sm">
          Seamlessly navigate our user-friendly interface. Designed with
          simplicity & decentralization in mind
        </p>
      </div>

      {/* Card 3 */}
      <div className="border-2 border-black lg:w-[25rem] lg:py-16 lg:px-10 rounded-2xl lg:shadow-custom shadow-custom2 p-8">
        <Image src="./images/deal.svg" width={40} height={40} alt="" className="lg:w-[40px] w-6"/>
        <p className="font-semibold text-black lg:py-3 p-1">Transparent Marketplace</p>
        <p className="text-black lg:text-base text-[1rem] tracking-wide text-sm">
          Experience decentralized lending with a balanced approach to interest
          rates & yield.
        </p>
      </div>
    </div>
  );
};

export default Features;
