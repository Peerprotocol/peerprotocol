"use client";

import { Cluster, PublicKey } from "@solana/web3.js";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createContext, useContext, useMemo } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useCluster } from "@/hooks/use-cluster";
import { useAnchorProvider } from "@/hooks/use-anchor-proivder";
import { getPda, PdaTag } from "@/lib/utils/get-pda";
import { txToast } from "@/lib/utils/toast";
import { BN } from "@coral-xyz/anchor";
import { getAta } from "@/lib/utils/getAta";
import { getPeerProtocolProgram, getPeerProtocolProgramId, getReadOnlyPeerProtocolProgram } from "../../solana-contracts/peer-protocol/src/peer-protocol-exports";

// READONLY PROGRAM
const readOnlyPeerProtocolProgram = getReadOnlyPeerProtocolProgram();

// TYPES
type ProtocolDataType = Awaited<
  ReturnType<typeof readOnlyPeerProtocolProgram.account.protocol.all>
>[0];
type UserProfileType = Awaited<
  ReturnType<typeof readOnlyPeerProtocolProgram.account.userProfile.fetch>
>;
interface ProgramContextType {
  userPubKey: PublicKey | null | undefined;
  userProfilePda: PublicKey;
  protocolData: ProtocolDataType | undefined;
  userData: UserProfileType | undefined;
  depositSol: UseMutationResult<any, unknown, { amount: number }, unknown>;
  withdrawSol: UseMutationResult<any, unknown, { amount: number }, unknown>;
  depositSpl: UseMutationResult<
    any,
    unknown,
    { amount: number; mint: PublicKey },
    unknown
  >;
  withdrawSpl: UseMutationResult<
    any,
    unknown,
    { amount: number; mint: PublicKey },
    unknown
  >;
  initUser: UseMutationResult<any, unknown, void, unknown>;
  userProfileSolBal: number | undefined;
}

const ProgramContext = createContext<ProgramContextType | null>(null);

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgram must be used within a ProgramContextProvider");
  }
  return context;
};

export const ProgramContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // HOOKS
  const { connection } = useConnection();
  const { wallet } = useWallet();
  const { cluster } = useCluster();
  const anchorProvider = useAnchorProvider();
  const queryClient = useQueryClient();

  // PROGRAM SETUP
  const programId = useMemo(
    () => getPeerProtocolProgramId(cluster?.network as Cluster),
    [cluster]
  );
  const program = getPeerProtocolProgram(anchorProvider);

  // USER SETUP
  const userPubKey = wallet?.adapter.publicKey;
  const userProfilePda = getPda(PdaTag.USER_PROFILE_TAG, userPubKey, programId);

  // QUERIES
  const userProfileQuery = useQuery({
    queryKey: ["peer-protocol", "user-init", { cluster, userPubKey }],
    queryFn: () => program.account.userProfile.fetch(userProfilePda),
  });

  const protocolQuery = useQuery({
    queryKey: ["peer-protocol", "protocol", { cluster, userPubKey }],
    queryFn: () => program.account.protocol.all(),
  });

  const balanceQuery = useQuery({
    queryKey: ["peer-protocol", "balance", { cluster, userPubKey }],
    queryFn: () => program.provider.connection.getBalance(userProfilePda),
  });

  // QUERY DATA
  const protocolData = protocolQuery.data?.[0];
  const userData = userProfileQuery.data;

  // MUTATIONS
  const initUser = useMutation({
    mutationKey: ["peer-protocol", "initialize-user", { cluster, userPubKey }],
    mutationFn: async () => {
      if (!userPubKey) return;
      if (!protocolData) return;

      return await program.methods
        .initUser()
        .accounts({
          userProfile: userProfilePda,
          authority: userPubKey,
          protocol: protocolData.publicKey,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "user-init"],
      });
      txToast.success("User account initialized successfully!");
    },
    onError: (error) => {
      txToast.error("Error initializing user account!");
    },
  });

  const depositSol = useMutation({
    mutationKey: ["peer-protocol", "deposit-sol", { cluster, userPubKey }],
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!userPubKey) return;
      if (!protocolData) return;
      return await program.methods
        .depositSol(new BN(amount))
        .accounts({
          authority: userPubKey,
          protocol: protocolData.publicKey,
          userProfile: userProfilePda,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({ queryKey: ["peer-protocol", "balance"] });
      txToast.success("deposit successful!");
    },
    onError: (error) => {
      txToast.error("Error depositing funds!");
    },
  });

  const withdrawSol = useMutation({
    mutationKey: ["peer-protocol", "withdraw-sol", { cluster, userPubKey }],
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!userPubKey) return;
      if (!protocolData) return;
      return await program.methods
        .withdrawSol(new BN(amount))
        .accounts({
          authority: userPubKey,
          protocol: protocolData.publicKey,
          userProfile: userProfilePda,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({ queryKey: ["peer-protocol", "balance"] });
      txToast.success("withdraw successful!");
    },
    onError: (error) => {
      txToast.error("Error withdrawing funds!");
    },
  });

  const depositSpl = useMutation({
    mutationKey: ["peer-protocol", "deposit-spl", { cluster }, userPubKey],
    mutationFn: async ({
      amount,
      mint,
    }: {
      amount: number;
      mint: PublicKey;
    }) => {
      if (!userPubKey) return;
      if (!protocolData) return;
      return await program.methods
        .depositSpl(new BN(amount))
        .accounts({
          authority: userPubKey,
          protocol: protocolData.publicKey,
          userProfile: userProfilePda,
          mint,
          userProfileAta: getAta(userProfilePda, mint),
          userAta: getAta(userPubKey, mint),
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "token-balance"],
      });
      txToast.success("deposit successful!");
    },
    onError: (error) => {
      txToast.error("Error depositing funds!");
    },
  });

  const withdrawSpl = useMutation({
    mutationKey: ["peer-protocol", "withdraw-spl", { cluster }, userPubKey],
    mutationFn: async ({
      amount,
      mint,
    }: {
      amount: number;
      mint: PublicKey;
    }) => {
      if (!userPubKey) return;
      if (!protocolData) return;

      const userProfileAta = getAta(userProfilePda, mint);
      const userAta = getAta(userPubKey, mint);

      return await program.methods
        .withdrawSpl(new BN(amount))
        .accounts({
          authority: userPubKey,
          protocol: protocolData.publicKey,
          userProfile: userProfilePda,
          mint,
          userProfileAta,
          userAta,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      queryClient.invalidateQueries({
        queryKey: ["peer-protocol", "token-balance"],
      });
      txToast.success("withdraw successful!");
    },
    onError: (error) => {
      txToast.error("Error withdrawing funds!");
    },
  });
  return (
    <ProgramContext.Provider
      value={{
        userPubKey,
        protocolData,
        userData,
        depositSol,
        initUser,
        withdrawSol,
        userProfileSolBal: balanceQuery.data,
        depositSpl,
        withdrawSpl,
        userProfilePda,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};
