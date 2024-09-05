import React from "react";
import Image from "next/image";

interface DepositWithdrawProps {
  type: "Deposit" | "Withdraw" | "Borrow"; // Add "Borrow" as a valid option
  availableBalance: number;
  currencyIcon: string;
  currencyName: string;
  onClose: () => void;
  onSubmit: (amount: string) => void;
}


const DepositWithdraw: React.FC<DepositWithdrawProps> = ({
  type,
  availableBalance,
  currencyIcon,
  currencyName,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = React.useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center bg-white px-14 py-28 rounded-xl shadow-md w-full max-w-xl mx-auto">
        <button className="absolute top-2 right-2 text-xl bg-black px-[0.38rem] rounded-full" onClick={onClose}>
          &#x2715;
        </button>
        <div className="flex items-center justify-between w-full mb-4">
          <div className="flex items-center">
            <Image
              src={currencyIcon}
              alt={currencyName}
              width={24}
              height={24}
            />
            <p className="ml-2 text-sm text-black">{currencyName}</p>
          </div>
          <p className="text-gray-500">Available: {availableBalance}</p>
        </div>
        <div className="flex items-center border border-gray-400 rounded-3xl px-8 py-3 w-full mb-2">
        <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Use regex to only allow numeric input
              if (/^\d*\.?\d*$/.test(value)) {
                handleAmountChange(e);
              }
            }}
            placeholder="Enter Amount"
            className="flex-1 outline-none text-xl appearance-none text-black"
            style={{
              MozAppearance: "textfield",
              WebkitAppearance: "none",
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-black text-white text-lg rounded-full w-full py-3"
        >
          {type}
        </button>

        <div className="flex gap-3 absolute bottom-6">
          <p className="text-sm text-gray-600">Powered by Peer Protocol</p>
          <Image src="images/LogoBlack.svg" width={20} height={40} alt="peerlogo" />
        </div>
      </div>

    </div>
  );
};

export default DepositWithdraw;
