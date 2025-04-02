import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { bscTestnet } from "wagmi/chains";

const projectId = import.meta.env.VITE_PROJECT_ID;
// const ChainId = import.meta.env.VITE_APP_chainID;


const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const mainnet = {
  id: 1337,
  name: 'Localhost Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://localhost:7545'] },
  },
  blockExplorers: {
    default: {
      name: 'BscScan',
      url: 'https://testnet.bscscan.com',
      apiUrl: 'https://testnet.bscscan.com/api',
    },
  },
  contracts: {
    // multicall3: {
    //   address: '0xca11bde05977b3631167028862be2a173976ca11',
    //   blockCreated: 17422483,
    // },
  },
  testnet: true,
};

const chains = [bscTestnet, mainnet];
// console.log('chains', chains)

const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
});

// Create and configure the Web3Modal
const initializeWeb3Modal = () => {
  createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
    enableOnramp: false // Optional - false as default
  });
};

export { config, initializeWeb3Modal };
