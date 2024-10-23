import { Program } from "@coral-xyz/anchor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PeerProtocol } from "../../../solana-contracts/peer-protocol/src/peer-protocol-exports";
import { PublicKey } from "@solana/web3.js";
import { toast } from "react-toastify";

export const useInitUser = (
  program: Program<PeerProtocol>,
  protocolId: PublicKey | undefined | null
) => {
  const queryClient = useQueryClient();

  const initUser = useMutation({
    mutationKey: ["peer-protocol", "init-user"],
    mutationFn: async () => {
      if (!protocolId) return;

      return await program.methods
        .initUser()
        .accounts({ protocol: protocolId })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "user-init"],
      });
      toast.success("User account initialized successfully!");
    },
    onError: (error) => {
      console.error("Error initializing user account", error);
      toast.error("Error initializing user account!");
    },
  });

  return { initUser };
};
