import { Program } from "@coral-xyz/anchor";
import { useQuery } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { getAccount, getMint } from "@solana/spl-token";
import { getAta } from "@/lib/utils/getAta";

export const useGetTokenBalance = (
  program: Program<PeerProtocol>,
  address: PublicKey,
  mint: PublicKey | null
) => {
  const userSolBalanceQuery = useQuery({
    queryKey: ["peer-protocol", "token-balance", { address, mint }],
    queryFn: async () => {
      if (mint === null) return { amount: 0, decimals: 0 };

      const connection = program.provider.connection;

      const ata = getAta(address, mint);
      const [info, mintDetails] = await Promise.all([
        getAccount(connection, ata),
        getMint(connection, mint),
      ]);

      return { amount: info.amount, decimals: mintDetails.decimals };
    },
  });

  return {
    tokenBalance: userSolBalanceQuery.data?.amount,
    tokenDecimals: userSolBalanceQuery.data?.decimals,
  };
};
