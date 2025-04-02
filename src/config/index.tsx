import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import {
  mainnet,
  arbitrum,
  solana,
  solanaDevnet,
  solanaTestnet,
  bsc,
  bscTestnet,
  opBNB,
  opBNBTestnet,
} from "@reown/appkit/networks";
import type { AppKitNetwork } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = import.meta.env.VITE_PROJECT_ID;

if (!projectId) {
  // throw new Error('Project ID is not defined')
}

export const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://reown.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networksArr = {
  bsc,
  bscTestnet,
};

// for custom networks visit -> https://docs.reown.com/appkit/react/core/custom-networks
export const networks = [networksArr[import.meta.env.VITE_NETWORKS]] as [
  AppKitNetwork,
  ...AppKitNetwork[]
];

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;
