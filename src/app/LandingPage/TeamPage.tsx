import Image from "next/image";

const Team = () => {
  return (
      <div id="Team" className="py-56"> 
      {/* start here */}
      <div className="lg:grid grid-cols-3 w-fit gap-16 mx-auto block">
        <div className="col-span-3">
            <h1 className="text-black text-4xl font-bold font-raleway">OUR TEAM</h1>
        </div>
        {/* deon face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Deon.png" alt="" width={380} height={40} />
          {/* here */}
          <div>
          <p className="text-2xl font-semibold text-black py-1">Emmanuel Daniel</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">Co-founder & CEO</p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
          </div>
        </div>

        {/* Kev face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Kev.png" alt="" width={380} height={40} />
          <p className="text-2xl font-semibold text-black py-1">Kelvin Duche</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">Co-founder & Product Designer</p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* David face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Davy.png" alt="" width={380} height={40} />
          <p className="text-2xl font-semibold text-black py-1">Akachukwu David</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">Co-founder & Blockchain Dev</p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Izzy face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Izzy.png" alt="" width={380} height={40} />
          <p className="text-2xl font-semibold text-black py-1">Isaac Onyemachi</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">Co-founder & CTO</p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>

        {/* Stephen face card */}
        <div className="cursor-pointer lg:m-0 my-10">
          <Image src="/images/Stephen.png" alt="" width={380} height={40} />
          <p className="text-2xl font-semibold text-black py-1">Stephen Okosieme</p>
          <div className="flex justify-between">
            <p className="text-gray-500 font-semibold text-sm">Product Manager</p>
            <div className="flex">
              <Image
                src="./images/Linkedinsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/TwitterXsvg.svg"
                alt=""
                width={20}
                height={40}
              />
              <Image
                src="./images/Telegramsvg.svg"
                alt=""
                width={20}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
