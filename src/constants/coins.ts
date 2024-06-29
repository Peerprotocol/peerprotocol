import { Interface } from "readline";

interface Coin {
  ticker: string;
  mint_address: string;
  pool_address: string;
  image: string;
}

export const allowedCoins: Coin[] = [
  {
    ticker: "PEER",
    mint_address: "B2Mc28Ehe4m4TvqJhAVVGnucuKwLgPg88qB9zX87WQEd",
    pool_address: "",
    image: "/image/logo.png",
  },
  {
    ticker: "USDC",
    mint_address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    pool_address: "5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7",
    image: "/image/usdc.png",
  },
];
