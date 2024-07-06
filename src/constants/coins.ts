import { Interface } from "readline";

export interface Coin {
  ticker: string;
  mint_address: string;
  pool_address: string;
  image: string;
  admin_ata: string;
  admin_ata_pda: string;
  decimals: number;
}

export const allowedCoins: Coin[] = [
  // {
  //   ticker: "PEER",
  //   mint_address: "B2Mc28Ehe4m4TvqJhAVVGnucuKwLgPg88qB9zX87WQEd",
  //   pool_address: "",
  //   image: "/image/logo.png",
  //   admin_ata: "EMYEazKVjntZiqaxNpzxgvX1Dou59vJWMS87EmqyApab",
  //   admin_ata_pda: "DMuppmf23iDMZ2yv3wLRos7ddkxZb4QDwJeX9kGB7NXc",
  //   decimals: 9,
  // },
  {
    ticker: "USDC",
    mint_address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    pool_address: "5SSkXsEKQepHHAewytPVwdej4epN1nxgLVM84L4KXgy7",
    image: "/image/usdc.png",
    admin_ata: "cqYNVxjS7Xin1LmfM7KMwqKockNZpa4yiPkJ1L8ZvWN",
    admin_ata_pda: "9BzsJTjC7N2y1qCYAhtYFy1FdNxAUYyfbTiz8XevTVBE",
    decimals: 6,
  },
];
