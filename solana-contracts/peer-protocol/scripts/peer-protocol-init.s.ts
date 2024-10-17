import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { getPeerProtocolProgram } from "../src/peer-protocol-exports";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import keyData from "../keys/id.json";

const keypair = Keypair.fromSecretKey(Uint8Array.from(keyData));
const wallet = new Wallet(keypair);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const provider = new AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});
async function main() {
  const protocolKeyPair = Keypair.generate();
  const program = getPeerProtocolProgram(provider);

  const initializeProtocolTx = await program.methods
    .initProtocol()
    .accounts({ protocol: protocolKeyPair.publicKey })
    .signers([protocolKeyPair])
    .rpc();

  console.log("Protocol Initialized", initializeProtocolTx);

  //   const accounts = await program.account.userProfile.fetch(
  //     "A3X2cgRxtBQAP4LwC7vUDR2wxKozALT2XL5a2Xs9o93E"
  //   );
  //   console.log("Accounts", accounts);
  // const protocol = await program.account.protocol.all();
  // console.log("Protocol", protocol);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
