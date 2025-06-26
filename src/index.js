// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WalletProvider } from "./context/WalletProvider";
import { BrowserRouter } from "react-router-dom";
// src/index.js
import './index.css'; // ✅ This must be present


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletProvider>
      <BrowserRouter> {/* ✅ Wrap here so Navbar can use useNavigate */}
        <App />
      </BrowserRouter>
    </WalletProvider>
  </React.StrictMode>
);
