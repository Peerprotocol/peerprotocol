import { Program } from "@coral-xyz/anchor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

export const useInitUser = (
  program: Program<PeerProtocol>,
  userPubKey: PublicKey | null | undefined,
  protocolPubKey: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const initUser = useMutation({
    mutationKey: ["peer-protocol", "init-user"],
    mutationFn: async () => {
      if (!userPubKey) return;
      if (!protocolPubKey) return;

      return await program.methods
        .initUser()
        .accounts({
          authority: userPubKey,
          protocol: protocolPubKey,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "user-init"],
      });
      toast.success("User account initialized successfully!");
    },
    onError: (error) => {
      toast.error("Error initializing user account!");
    },
  });

  return { initUser };
};
