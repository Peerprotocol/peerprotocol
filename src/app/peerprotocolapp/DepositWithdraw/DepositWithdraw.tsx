import React from "react";
import Image from "next/image";

interface DepositWithdrawProps {
  type: "Deposit" | "Withdraw";
  availableBalance: string;
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
      <div className="relative flex flex-col items-center bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
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
            <p className="ml-2 text-xl">{currencyName}</p>
          </div>
          <p className="text-gray-500">Available: {availableBalance}</p>
        </div>
        <div className="flex items-center border border-gray-400 rounded-3xl px-8 py-3 w-full mb-2">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter Amount"
            className="flex-1 outline-none text-xl appearance-none"
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
      </div>
    </div>
  );
};

export default DepositWithdraw;
