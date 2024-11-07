import { Program } from "@coral-xyz/anchor";
import { useQuery } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";

export const useGetSolBalance = (
  program: Program<PeerProtocol>,
  address: PublicKey | undefined | null
) => {
  const userSolBalanceQuery = useQuery({
    queryKey: ["peer-protocol", "sol-balance", { address }],
    queryFn: async () => {
      if (!address) {
        return 0;
      }
      return await program.provider.connection.getBalance(address);
    },
  });

  return { solBalance: userSolBalanceQuery.data };
};
