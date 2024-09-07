import Image from "next/image";

export const XionWallet = () => {
  const content = "Connect Wallet";
  return (
    <div className="relative">
      <button
        className="bg-[rgba(0,0,0,0.8)] flex items-center gap-2 py-2 rounded-3xl px-3"
        onClick={() => {}}
      >
        <Image
          src="/images/walletconnect.svg"
          height={20}
          width={20}
          alt="connect wallet"
        />
        <p className="text-sm">{content}</p>
      </button>
    </div>
  );
};
