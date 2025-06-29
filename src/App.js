// src/App.js
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import OwnedNFTs from "./pages/OwnedNFTs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import './App.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "NFT Marketplace",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Replace with actual
  chains: [mainnet],
  ssr: false,
});

const queryClient = new QueryClient();

const customTheme = lightTheme({
  accentColor: "#6366F1", // indigo-500
  accentColorForeground: "white",
  borderRadius: "large",
  fontStack: "system",
});

const App = () => {
  const location = useLocation();

  // Hide navbar only on landing page
  const showNavbar = location.pathname !== "/";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[mainnet]} theme={customTheme}>
          {showNavbar && <Navbar />}
          <Routes>
            <Route path="/LandingPage" element={<LandingPage />} />
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
