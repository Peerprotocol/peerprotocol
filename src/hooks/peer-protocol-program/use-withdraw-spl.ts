import { BN, Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAta } from "@/lib/utils/getAta";
import { toast } from "react-toastify";

export const useWithdrawSpl = (
  program: Program<PeerProtocol>,
  protocolId: PublicKey | undefined | null,
  userProfilePda: PublicKey
) => {
  const queryClient = useQueryClient();

  const withdrawSpl = useMutation({
    mutationKey: ["peer-protocol", "withdraw-spl"],
    mutationFn: async ({
      amount,
      mint,
    }: {
      amount: number;
      mint: PublicKey;
    }) => {
  
      if (!protocolId) return;

      const userProfileAta = getAta(userProfilePda, mint);

      return await program.methods
        .withdrawSpl(new BN(amount))
        .accounts({
      
          protocol: protocolId,
          mint,
          userProfileAta,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "token-balance"],
      });
      toast.success("withdraw successful!");
    },
    onError: (error) => {
      toast.error("Error withdrawing funds!");
    },
  });

  return { withdrawSpl };
};
