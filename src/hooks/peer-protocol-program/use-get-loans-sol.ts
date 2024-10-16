import { Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { useQuery } from "@tanstack/react-query";

export const useGetLoansSol = (program: Program<PeerProtocol>) => {
  const solLoansQuery = useQuery({
    queryKey: ["peer-protocol", "loans", "sol"],
    queryFn: () => program.account.loanSol.all(),
  });

  return { solLoans: solLoansQuery.data };
};
