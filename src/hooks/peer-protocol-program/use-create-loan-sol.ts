import { BN, Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getLoanPda } from "@/lib/utils/get-pda";

export const useCreateLoanSol = (
  program: Program<PeerProtocol>,
  programId: PublicKey | undefined | null,
  protocol: PublicKey | null | undefined,
  authority: PublicKey | null | undefined
) => {
  const queryClient = useQueryClient();

  const createLoanSol = useMutation({
    mutationKey: ["peer-protocol", "withdraw-sol"],
    mutationFn: async ({
      loanAmount,
      loanDuration,
      loanInterestRate,
      loanltvRatio,
      loanId,
    }: {
      loanAmount: number;
      loanltvRatio: number;
      loanInterestRate: number;
      loanDuration: number;
      loanId: number;
    }) => {
      if (!authority) return;
      if (!programId) return;
      if (!protocol) return;

      const loan = getLoanPda(authority, programId, Number(loanId));
      console.log(loan.toString());
      console.log(loanId);

      await program.methods
        .createLoanSol(
          loanltvRatio,
          new BN(loanDuration),
          new BN(loanAmount),
          loanInterestRate
        )
        .accounts({ loan, protocol, authority: authority })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "loans", "sol"],
      });
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "user-init"],
      });
      toast.success("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("");
    },
  });

  return { createLoanSol };
};
