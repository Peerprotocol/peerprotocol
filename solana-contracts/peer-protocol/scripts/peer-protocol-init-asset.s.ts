import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import { getPeerProtocolProgram } from "../src/peer-protocol-exports";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import keyData from "../keys/id.json";

const keypair = Keypair.fromSecretKey(Uint8Array.from(keyData));
const wallet = new Wallet(keypair);
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const provider = new AnchorProvider(connection, wallet, {
  commitment: "confirmed",
});
async function main(mint: string) {
  const mintKey = new PublicKey(mint);

  const program = getPeerProtocolProgram(provider);

  const protocolAccount = await program.account.protocol.all();

  const initAssetTx = await program.methods
    .initAsset()
    .accounts({
      admin: keypair.publicKey,
      mint: mintKey,
      protocol: protocolAccount[0].publicKey,
    })
    .rpc();

  console.log("Init Asset", initAssetTx);
}

main("9TQPQ15vx8UH5qZNz5pPctzjnhYUET8rp25wMfDgXYkM").catch((err) => {
  console.error(err);
  process.exit(1);
});
