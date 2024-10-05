import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PublicKey } from "@solana/web3.js";

export function getAta(address: PublicKey, mint: PublicKey) {
  return getAssociatedTokenAddressSync(mint, address, true);
}
