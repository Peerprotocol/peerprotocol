import { Program } from "@coral-xyz/anchor";
import { useQuery } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";

export const useGetUserData = (
  program: Program<PeerProtocol>,
  userProfilePda: PublicKey
) => {
  const userProfileQuery = useQuery({
    queryKey: ["peer-protocol", "user-init", { userProfilePda }],
    queryFn: () => program.account.userProfile.fetch(userProfilePda),
  });

  return { userProfileData: userProfileQuery.data };
};
