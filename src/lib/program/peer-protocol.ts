// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Idl, Program } from "@coral-xyz/anchor";
import { Cluster, PublicKey } from "@solana/web3.js";
import PeerProtocolIDL from "./peer_protocol.json";
import type { PeerProtocolContracts } from "./peer_protocol_contracts";

// Re-export the generated IDL and type
export { PeerProtocolContracts, PeerProtocolIDL };

// The programId is imported from the program IDL.
export const COUNTER_PROGRAM_ID = new PublicKey(PeerProtocolIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getCounterProgram(provider: AnchorProvider) {
  return new Program(PeerProtocolIDL as PeerProtocolContracts, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
      return new PublicKey("EcGhLkbDw9rWoJXgwfQiJEy32THQftmVY3mQwKxY6xk1");
    case "testnet":
    case "mainnet-beta":
    default:
      return COUNTER_PROGRAM_ID;
  }
}


const idl:Idl