import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../target/types/peer_protocol";
import { describe } from "mocha";

describe("peer-protocol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PeerProtocol as Program<PeerProtocol>;

  it("Is initialized!", async () => {
    // Add your test here.
    const protocolKeyPair = anchor.web3.Keypair.generate();
    const tx = await program.methods
      .initProtocol()
      .accounts({ protocol: protocolKeyPair.publicKey })
      .signers([protocolKeyPair])
      .rpc();
    console.log("Your transaction signature", tx);
  });
});
