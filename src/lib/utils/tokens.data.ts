import { PublicKey } from "@solana/web3.js";

interface NativeToken {
  name: string;
  symbol: string;
  isNative: true;
  image: string;
}

interface SplToken {
  name: string;
  image: string;
  symbol: string;
  isNative: false;
  mintAddress: PublicKey;
}

// Create a union type for both tokens
export type Token = NativeToken | SplToken;

export const whitelistedTokens: { [key: string]: Token } = {
  USDC: {
    isNative: false,
    name: "USDC Coin",
    symbol: "USDC",
    mintAddress: getPubKey("9TQPQ15vx8UH5qZNz5pPctzjnhYUET8rp25wMfDgXYkM"),
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  },
  SOL: {
    isNative: true,
    name: "Solana",
    symbol: "SOL",
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png",
  },
};
function getPubKey(token: string) {
  return new PublicKey(token);
}

// BvnDpX4fg5JwQWg3hYUTUh4hcH5K2nVMmyiBX3grUhNc is the token account for the USDC token
