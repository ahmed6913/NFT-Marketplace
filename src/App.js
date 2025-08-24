// src/App.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import OwnedNFTs from "./pages/OwnedNFTs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import './App.css';
import Partner from './pages/Partner';
import PartnerPayment from './pages/PartnerPayment';
import MapPage from './pages/Map';
import ChatPage from './pages/ChatPage';

import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, useAccount } from "wagmi";
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

// 🧠 WebSocket listener logic
const WebSocketListener = () => {
  const { address: wallet } = useAccount();

  useEffect(() => {
    if (!wallet) return;

    const socket = new WebSocket(`ws://localhost:8080/ws?wallet=${wallet}`);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "nft_minted") {
        alert(data.message); // Replace with toast/snackbar later
      }
    };

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    socket.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
    };

    return () => {
      socket.close();
    };
  }, [wallet]);

  return null; // no UI
};

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={[mainnet]} theme={customTheme}>
          {showNavbar && <Navbar />}
          <WebSocketListener /> {/* 👈 Real-time notification listener */}
          <Routes>
            <Route path="/partner" element={<Partner />} />
            <Route path="/partner/payment" element={<PartnerPayment />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/ownednfts" element={<OwnedNFTs />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
