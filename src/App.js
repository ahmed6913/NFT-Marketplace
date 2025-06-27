// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import OwnedNFTs from "./pages/OwnedNFTs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import './App.css';

// ✅ Wagmi v1 + RainbowKit v1 setup
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

// ✅ Create config with wagmi v1 style
const config = getDefaultConfig({
  appName: "NFT Marketplace",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // 🔐 required from WalletConnect v2
  chains: [mainnet],
  ssr: false,
});

const queryClient = new QueryClient();

const customTheme = lightTheme({
  accentColor: "#6366F1", // Tailwind indigo-500
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
});

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[mainnet]} theme={customTheme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ownednfts" element={<OwnedNFTs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
