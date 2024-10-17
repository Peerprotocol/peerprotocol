import { BN, Program } from "@coral-xyz/anchor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { getAta } from "@/lib/utils/getAta";
import { toast } from "react-toastify";

export const useDepositSpl = (
  program: Program<PeerProtocol>,
  userPubKey: PublicKey | null | undefined,
  protocolId: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const depositSpl = useMutation({
    mutationKey: ["peer-protocol", "deposit-spl"],
    mutationFn: async ({
      amount,
      mint,
    }: {
      amount: number;
      mint: PublicKey;
    }) => {
      if (!userPubKey) return;
      if (!protocolId) return;
      return await program.methods
        .depositSpl(new BN(amount))
        .accounts({
          protocol: protocolId,
          mint,
          userAta: getAta(userPubKey, mint),
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "token-balance"],
      });
      toast.success("deposit successful!");
    },
    onError: (error) => {
      toast.error("Error depositing funds!");
    },
  });

  return { depositSpl };
};
