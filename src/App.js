
// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import OwnedNFTs from "./pages/OwnedNFTs";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import './App.css'; // ✅ if you're using App.css instead


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/ownednfts" element={<OwnedNFTs />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
