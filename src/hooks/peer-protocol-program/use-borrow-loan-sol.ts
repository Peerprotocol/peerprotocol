import { BN, Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useBorrowLoanSol = (
  program: Program<PeerProtocol>,
  userPubKey: PublicKey | null | undefined,
  protocolPubKey: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const borrowLoanSol = useMutation({
    mutationKey: ["peer-protocol", "withdraw-sol"],
    mutationFn: async ({ loanIndex }: { loanIndex: number }) => {
      if (!userPubKey) return;
      if (!protocolPubKey) return;

      await program.methods
        .borrowSol(new BN(loanIndex))
        .accounts({ protocol: protocolPubKey, authority: userPubKey })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({ queryKey: [] });
      toast.success("");
    },
    onError: (error) => {
      toast.error("");
    },
  });

  return { borrowLoanSol };
};
