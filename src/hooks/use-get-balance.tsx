import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";

export function useGetBalance() {
  const { connection } = useConnection();
  const { wallet } = useWallet();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["balance", wallet?.adapter.publicKey?.toBase58()],
    queryFn: () => {
      if (wallet === null) return null;
      if (wallet.adapter.publicKey === null) return null;
      return connection.getBalance(wallet.adapter.publicKey);
    },
  });

  return { data, isLoading, isError, isSuccess };
}
