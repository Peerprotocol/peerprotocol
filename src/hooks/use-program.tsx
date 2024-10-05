import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCluster } from "./use-cluster";
import { useAnchorProvider } from "./use-anchor-proivder";
import { useMemo } from "react";
import { Cluster, Keypair, PublicKey } from "@solana/web3.js";

import { useMutation, useQuery } from "@tanstack/react-query";
import BN from "bn.js";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { getPda, PdaTag } from "@/lib/program/get-pda";
import {
  getPeerProtocolProgram,
  getPeerProtocolProgramId,
} from "../../solana-contracts/peer-protocol/src/peer-protocol-exports";

export function useProgram() {
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const { cluster } = useCluster();
  const anchorProvider = useAnchorProvider();
  const programId = useMemo(
    () => getPeerProtocolProgramId(cluster?.network as Cluster),
    [cluster]
  );
  const program = getPeerProtocolProgram(anchorProvider);

  // const balance = useQuery({
  //   queryKey: ["peer-protocol", "balance", { cluster }],
  //   queryFn: () => program.account.userProfile.all(),
  // });

  const userProfilePda = getPda(
    PdaTag.USER_PROFILE_TAG,
    wallet?.adapter?.publicKey,
    programId
  );

  const initStatus = useQuery({
    queryKey: ["peer-protocol", "user-init", { cluster }],
    queryFn: () => program.account.userProfile.fetch(userProfilePda),
  });

  const protocol = useQuery({
    queryKey: ["peer-protocol", "protocol", { cluster }],
    queryFn: () => program.account.protocol.all(),
  });

  const initializeUser = useMutation({
    mutationKey: ["peer-protocol", "initialize-user", { cluster }],
    mutationFn: async ({ authority }: { authority: PublicKey }) =>
      protocol &&
      protocol.data &&
      (await program.methods
        .initUser()
        .accounts({
          userProfile: userProfilePda,
          authority,
          protocol: protocol.data[0].publicKey,
        })
        .rpc()),
  });

  const depositSol = useMutation({
    mutationKey: ["peer-protocol", "deposit", { cluster }],
    mutationFn: async ({
      amount,
      authority,
    }: {
      amount: number;
      authority: PublicKey;
    }) =>
      protocol &&
      protocol.data &&
      (await program.methods
        .depositSol(new BN(amount))
        .accounts({
          authority: authority,
          protocol: protocol.data[0].publicKey,
        })
        .rpc()),
    onSuccess: (signature) => {
      // transactionToast(signature);
      // return accounts.refetch();
      console.log(signature);
    },
    onError: () => "Failed to deposit collaterial",
  });

  // const withdraw = useMutation({
  //   mutationKey: ["peer-protocol", "withdraw", { cluster }],
  //   mutationFn: ({
  //     amount,
  //     collaterial,
  //     authority,
  //     fromAta,
  //     toAta,
  //     ataPdaAuthority,
  //   }: {
  //     amount: number;
  //     collaterial: PublicKey;
  //     authority: Keypair;
  //     fromAta: PublicKey;
  //     toAta: PublicKey;
  //     ataPdaAuthority: PublicKey;
  //   }) =>
  //     program.methods
  //       .withdrawCollaterial(new BN(amount))
  //       .accounts({
  //         acceptedCollaterial: collaterial,
  //         authority: authority.publicKey,
  //         fromAta,
  //         toAta,
  //         tokenProgram: TOKEN_PROGRAM_ID,
  //         userProfile: userProfilePda,
  //         ataPdaAuthority,
  //       })
  //       .signers([authority])
  //       .rpc(),
  //   onSuccess: (signature) => {
  //     console.log(signature);
  //   },
  //   onError: () => "Failed to withdraw collaterial",
  // });

  return {
    // balance,
    initStatus,
    initializeUser,
    depositSol,
    // withdraw,
  };
}
