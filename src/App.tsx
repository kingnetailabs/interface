import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ConfigProvider, theme, App as AntdApp } from "antd";
import { createAppKit } from "@reown/appkit/react";
import {
  metadata,
  projectId,
  networks,
  wagmiAdapter,
} from "./config/index.tsx";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const generalConfig = {
  projectId,
  metadata,
  networks,
};

createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    email: false,

    socials: false,
  },
  allWallets: "SHOW",
  enableWalletConnect: false,
});

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            components: {
              InputNumber: {
                inputFontSize: 10,
              },
              Carousel: {
                arrowSize: 24,
              },
            },
          }}
        >
          <AntdApp>
            <RouterProvider router={router} />
          </AntdApp>
        </ConfigProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
