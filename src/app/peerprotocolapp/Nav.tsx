"uae client";
import Image from "next/image";
import Dropdown from "./dropdown";
import { useState } from "react";
import { WalletConnectButton } from "@/components/wallets/walletConnectButton";

const Nav = () => {
  const [selectedOption, setSelectedOption] = useState("solana");

  return (
    <nav className="flex justify-end items-center p-4 w-full gap-3">
      <Image
        src="/images/notification.svg"
        height={30}
        width={30}
        alt="Notification icon"
        className="ml-4"
      />
      <Dropdown
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      <WalletConnectButton network={selectedOption} />
    </nav>
  );
};

export default Nav;
