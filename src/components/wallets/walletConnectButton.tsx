import { SolanaWalletButton } from "./solanaWalletButton";
import { XionWallet } from "./xionWalletButton";

export const WalletConnectButton = ({ network }: { network: string }) => {
  switch (network) {
    case "xion":
      return <XionWallet />;
    default:
      return <SolanaWalletButton />;
  }
};
