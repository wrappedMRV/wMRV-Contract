import "@/../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  polygonMumbai,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Layout from "./layout";
import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    polygonMumbai
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  projectId: "e07b3f4240684e1347111f14891c65bb",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/toucanprotocol/mumbai",
  cache: new InMemoryCache(),
});

const homePageMetadata = {
  title: "Home Page Title",
  description: "Description of the Home Page"
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Layout >
          <ApolloProvider client={client}>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ApolloProvider>
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
