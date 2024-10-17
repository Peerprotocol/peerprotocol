import { BN, Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateLoanSpl = (
  program: Program<PeerProtocol>,
  userPubKey: PublicKey | null | undefined,
  protocolPubKey: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const createLoanSpl = useMutation({
    mutationKey: ["peer-protocol", "withdraw-sol"],
    mutationFn: async ({
      loanAmount,
      loanDuration,
      loanInterestRate,
      loanltvRatio,
      loan,
      mint,
    }: {
      loanAmount: number;
      loanltvRatio: number;
      loanInterestRate: number;
      loanDuration: number;
      loan: PublicKey;
      mint: PublicKey;
    }) => {
      if (!userPubKey) return;
      if (!protocolPubKey) return;

      await program.methods
        .createLoanSpl(
          loanltvRatio,
          new BN(loanDuration),
          new BN(loanAmount),
          loanInterestRate
        )
        .accounts({
          loan,
          protocol: protocolPubKey,
          authority: userPubKey,
          mint,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "loans", "spl"],
      });
      toast.success("");
    },
    onError: (error) => {
      toast.error("");
    },
  });

  return { createLoanSpl };
};
