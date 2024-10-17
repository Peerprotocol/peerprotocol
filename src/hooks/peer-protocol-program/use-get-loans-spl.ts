import { Program } from "@coral-xyz/anchor";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { useQuery } from "@tanstack/react-query";

export const useGetLoansSpl = (program: Program<PeerProtocol>) => {
  const fetchLoansSplQuery = useQuery({
    queryKey: ["peer-protocol", "loans", "spl"],
    queryFn: () => program.account.loanSpl.all(),
  });

  return { splLoans: fetchLoansSplQuery.data };
};
