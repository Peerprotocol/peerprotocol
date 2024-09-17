"use client";
import { useState } from "react";
import Nav from "../Nav";
import Sidebar from "../sidebar";
import CryptoChart from "../../peerprotocolapp/userProfile/cryptoChart";
import { ChartData, ChartOptions } from "chart.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { useGetBalance } from "@/lib/hooks/useGetBalance";

type DataType = "lend" | "borrow";

const UserProfile = () => {
  const [selectedData, setSelectedData] = useState<DataType>("lend");
  const { wallet } = useWallet();
  const { balance } = useGetBalance(wallet?.adapter.publicKey);

  console.log("balance", balance);

  const dataSets: Record<
    DataType,
    {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }
  > = {
    lend: {
      label: "Lend",
      data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 90, 100],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    borrow: {
      label: "Borrow",
      data: [28, 48, 40, 19, 86, 27, 90, 100, 85, 60, 40, 20],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
  };

  const data: ChartData<"line"> = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [dataSets[selectedData]],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Crypto Coin ${dataSets[selectedData].label} Graph`,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <main className="bg-[#F5F5F5] min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Nav />
          <div className="p-6">
            <h1 className="text-xl font-semibold mb-4 text-black">
              Crypto Coin Graph
            </h1>
            <div className="mb-4">
              <button
                className={`mr-2 p-2 rounded ${
                  selectedData === "lend"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setSelectedData("lend")}
              >
                Lend
              </button>
              <button
                className={`mr-2 p-2 rounded ${
                  selectedData === "borrow"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setSelectedData("borrow")}
              >
                Borrow
              </button>
            </div>
            <div></div>
            <CryptoChart data={data} options={options} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
