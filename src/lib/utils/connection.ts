import * as web3 from "@solana/web3.js";

export const connection = new web3.Connection(
  web3.clusterApiUrl("devnet"),
  "confirmed"
);
