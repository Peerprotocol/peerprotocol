import Image from "next/image";
import Dropdown from "./dropdown";
const Nav = () => {
  return (
    <nav className="flex justify-end items-center p-4 w-full gap-3">
      <Image
        src="/images/Notification.svg"
        height={30}
        width={30}
        alt="Notification icon"
        className="ml-4"
      />
      <Dropdown />
      <div className="bg-[rgba(0,0,0,0.8)] flex items-center gap-2 py-2 rounded-3xl px-3">
        <Image
          src="/images/walletconnect.svg"
          height={20}
          width={20}
          alt="connect wallet"
        />
        <button className="text-sm">Connect</button>
      </div>
    </nav>
  );
};

export default Nav;
