// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Idl, Program, Provider } from "@coral-xyz/anchor";
import { Cluster, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import PeerProtocolIDL from "../target/idl/peer_protocol.json";
import type { PeerProtocol } from "../target/types/peer_protocol";

// Re-export the generated IDL and type
export { PeerProtocol, PeerProtocolIDL };

// The programId is imported from the program IDL.
export const PEER_PROTOCOL_ID = new PublicKey(PeerProtocolIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getPeerProtocolProgram(provider: AnchorProvider) {
  return new Program(PeerProtocolIDL as PeerProtocol, provider);
}

export function getReadOnlyPeerProtocolProgram() {
  const connection = new Connection(clusterApiUrl("devnet"));
  const provider: Provider = { connection };
  return new Program(PeerProtocolIDL as PeerProtocol, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getPeerProtocolProgramId(cluster: Cluster | undefined) {
  switch (cluster) {
    case "devnet":
      return new PublicKey("246swZwvE2QMk2UFGAKYamCexfH5hSfXFrxmHLwZ9sdk");
    case "testnet":
    case "mainnet-beta":
    default:
      return PEER_PROTOCOL_ID;
  }
}
