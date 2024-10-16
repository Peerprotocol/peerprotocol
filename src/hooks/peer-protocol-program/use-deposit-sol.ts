import { BN, Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

export const useDepositSol = (
  program: Program<PeerProtocol>,
  protocolId: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const depositSol = useMutation({
    mutationKey: ["peer-protocol", "deposit-sol"],
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!protocolId) return;
      return await program.methods
        .depositSol(new BN(amount))
        .accounts({
          protocol: protocolId,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "sol-balance"],
      });
      toast.success("deposit successful!");
    },
    onError: (error) => {
      toast.error("Error depositing funds!");
    },
  });

  return { depositSol };
};
