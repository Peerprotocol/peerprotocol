import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { marketData } from "./mainMarket";
import SolIcon from "./../../../public/images/sol.svg";
import PeerProtocol from "./../../../public/images/LogoBlack.svg";

interface DepositWithdrawProps {
  type: string;
  availableBalance: string;
  currencyIcon: StaticImageData;
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
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative flex flex-col items-center bg-white px-16 rounded-xl shadow-md max-w-xl w-full h-[350px] mx-auto border text-black justify-center">
        <button className="absolute top-4 right-4 text-2xl" onClick={onClose}>
          &#x2715;
        </button>
        <div className="flex justify-between w-full mb-2">
          <div className="flex items-center gap-2">
            <Image
              src={currencyIcon}
              alt={currencyName}
              width={20}
              height={20}
            />
            <p className="text-xs">{currencyName}</p>
          </div>
          <p className="text-gray-500 text-sm pr-3">
            Available: {availableBalance}
          </p>
        </div>

        <div className="flex items-center border border-gray-400 rounded-3xl px-8 py-3 w-full mb-6">
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
            className="flex-1 outline-none text-xl appearance-none"
            style={{
              MozAppearance: "textfield",
              WebkitAppearance: "none",
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-black text-white text-md rounded-3xl w-full px-4 py-4 mt-1"
        >
          {type}
        </button>
        {/* <br /> */}
        <div className="flex items-center gap-2 absolute bottom-3">
          <small className="text-gray-500">Powered By Peer Protocol</small>
          <Image
            src={PeerProtocol}
            height={20}
            width={20}
            alt="jupiter-logo"
            className="opacity-50"
          />
        </div>
      </div>
    </div>
  );
};

const Market = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Main Market");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"Deposit" | "Borrow">("Deposit");

  const options = ["Main Market", "Meme Market"];

  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const openModal = (type: "Deposit" | "Borrow") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (amount: string) => {
    console.log(`${modalType} Amount:`, amount);
    closeModal();
  };

  return (
    <div className="p-8">
      <div className="relative text-left flex justify-between pt-20 pb-8">
        <p className="text-black text-3xl">Main Market</p>

        <div className="flex items-center gap-8">
          <div className="bg-gray-200 rounded-xl text-black flex gap-3 py-2 px-4 border">
            <p>Protocol</p>
            <p>P2P</p>
          </div>

          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 mt-32 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectChange(option)}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      option === selectedOption
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-x-auto text-black border ">
        <div className="grid grid-cols-5 pt-6 rounded-t-xl bg-smoke-white py-4">
          <div className="text-center font-semibold">Asset</div>
          <div className="text-center font-semibold">Supply</div>
          <div className="text-center font-semibold">Borrow</div>
          <div className="text-center font-semibold">Supply APY</div>
          <div className="text-center font-semibold">Borrow APY</div>
        </div>
        <div className="w-full grid grid-cols-5 rounded-b-xl text-gray-800 cursor-pointer">
          {marketData.map((row, index) => (
            <>
              <div className="flex flex-col">
                <div className="text-left px-4 py-6 border-t border-gray-300">
                  <div className="flex flex-col items-center mx-10 gap-1">
                    <div className="flex items-center gap-3">
                      <Image
                        src={row.image}
                        height={30}
                        width={30}
                        alt={row.asset}
                      />
                      <span className="font-semibold text-lg">{row.asset}</span>
                    </div>
                    <p className="text-xs text-gray-500">{row.price}</p>
                  </div>
                </div>
              </div>
              {/* supply tvl */}
              <div
                key={`${index}-maxTVL`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <div
                  className={`flex items-center gap-2 text-left justify-center ${
                    row.cap >= 70 ? "ml-8" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{row.deposits}</p>
                    <small className="text-gray-400">{row.maxTVL}</small>
                  </div>
                  <div>
                    {row.cap >= 90 ? (
                      <Image
                        src={row.alert}
                        height={20}
                        width={15}
                        alt="alert image"
                      />
                    ) : row.cap >= 70 ? (
                      <Image
                        src={row.caution}
                        height={20}
                        width={20}
                        alt="caution image"
                      />
                    ) : null}
                  </div>
                </div>
              </div>

              <div
                key={`${index}-maxTVL`}
                className="text-center px-4 py-6 border-t border-gray-300"
              >
                <p className="font-medium">{row.deposits}</p>
                <small className="text-gray-400">{row.maxTVL}</small>
              </div>
              {/* <div
                key={`${index}-deposits`}
                className="text-center flex items-start justify-center gap-1 px-4 py-6 border-t border-gray-300"
              >
                <p className="font-medium">{row.deposits}</p>
                <Image src={row.alert} height={25} width={25} alt="images" />
              </div> */}
              <div
                key={`${index}-supplyAPY`}
                className="text-center text-xs font-semibold text-gray-500 px-4 py-6 border-t border-gray-300"
              >
                <button
                  className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto"
                  onClick={() => openModal("Deposit")}
                >
                  Lend
                </button>
                {row.supplyAPY}
              </div>
              <div
                key={`${index}-borrowAPY`}
                className="text-center px-4 text-xs font-semibold text-gray-500 py-6 border-t border-gray-300"
              >
                <button
                  className="px-2 text-sm rounded-lg bg-[rgba(0,0,0,0.8)] mx-5 text-white w-20 h-8 mr-2 my-auto"
                  onClick={() => openModal("Borrow")}
                >
                  Borrow
                </button>
                {row.borrowAPY}
              </div>
            </>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <DepositWithdraw
          type={modalType}
          availableBalance="1000"
          currencyIcon={SolIcon}
          currencyName="SOL"
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Market;
