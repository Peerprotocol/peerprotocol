"uae client";
import Image from "next/image";
import Dropdown from "./dropdown";
import {
  useWalletModal,
  WalletIcon,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useMemo, useState } from "react";

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
} as const;

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setVisible: setModalVisible } = useWalletModal();
  const {
    buttonState,
    onConnect,
    onDisconnect,
    publicKey,
    walletIcon,
    walletName,
  } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    },
  });
  const content = useMemo(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else if (buttonState === "connecting" || buttonState === "has-wallet") {
      return LABELS[buttonState];
    } else {
      return LABELS["no-wallet"];
    }
  }, [buttonState, publicKey]);
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

      <div className="relative">
        <button
          className="bg-[rgba(0,0,0,0.8)] flex items-center gap-2 py-2 rounded-3xl px-3"
          onClick={() => {
            switch (buttonState) {
              case "no-wallet":
                setModalVisible(true);
                break;
              case "has-wallet":
                if (onConnect) {
                  onConnect();
                }
                break;
              case "connected":
                setMenuOpen((prev) => !prev);
                break;
            }
          }}
        >
          {walletIcon && walletName ? (
            <div style={{ height: "20px", width: "20px" }}>
              <WalletIcon
                wallet={{ adapter: { icon: walletIcon, name: walletName } }}
              />
            </div>
          ) : (
            <Image
              src="/images/walletconnect.svg"
              height={20}
              width={20}
              alt="connect wallet"
            />
          )}

          <p className="text-sm">{content}</p>
        </button>
        {menuOpen && (
          <ul className="bg-[rgba(0,0,0,0.8)] absolute top-10 right-0 rounded-3xl p-2 w-full text-center flex items-center justify-center">
            <li
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                if (onDisconnect) {
                  onDisconnect();
                  setMenuOpen(false);
                }
              }}
            >
              <p>Disconnect</p>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
