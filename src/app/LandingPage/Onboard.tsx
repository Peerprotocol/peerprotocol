const Onboard = () => {
  return (
    <div className="lg:h-screen p-0 bg-black text-white xl:w-[100%] flex flex-col justify-center h-fit py-8 sm:p-4 sm:pb-6">
      <div className="">
        <div className="">
          <p className="lg:text-[10rem] text-center font-bold lg:text-6xl text-4xl">GET</p>
          <p className="lg:text-[10rem] text-center font-bold lg:text-6xl text-4xl">ONBOARD</p>
        </div>

        <div className="text-center lg:py-16 w-full">
          <p className="lg:text-[2rem] text-lg sm:text-md">Join the waitlist</p>
          <p className="mx-auto text-center py-2 md:w-[80%] font-light sm:text-xs">
            Sign up and follow for updates about Mainnet launch, integrations,
            product launches and the future of XION.
          </p>
        </div>

        <div className="lg:w-[50%] bg-white mx-auto relative rounded-full md:w-[80%] sm:w-[90%]">
          <input
            placeholder="Enter your email address"
            className="lg:text-lg sm:text-xs text-sm text-black lg:h-16 rounded-full w-[80%] pl-8 sm:pl-3 focus:outline-none h-12"
            type="email"
          />
          <button className="border lg:text-base text-xs border-black px-3 py-2 rounded-3xl text-black absolute right-4 lg:top-3 top-2">
            Join Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
