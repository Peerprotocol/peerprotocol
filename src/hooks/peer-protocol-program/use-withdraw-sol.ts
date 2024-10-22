import { BN, Program } from "@coral-xyz/anchor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

export const useWithdrawSol = (
  program: Program<PeerProtocol>,
  protocolId: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const withdrawSol = useMutation({
    mutationKey: ["peer-protocol", "withdraw-sol"],
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!protocolId) return;
      return await program.methods
        .withdrawSol(new BN(amount))
        .accounts({
          protocol: protocolId,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "sol-balance"],
      });
      toast.success("withdraw successful!");
    },
    onError: (error) => {
      toast.error("Error withdrawing funds!");
    },
  });

  return { withdrawSol };
};
