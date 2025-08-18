
# NFT-Marketplace
- Buy, Sell and Trade NFTs (Next-Gen Loyalty Powered by Blockchain).

![Screenshot 2025-06-29 184716](https://github.com/user-attachments/assets/f2a1d1b8-d6e1-4b52-acd4-a834feea1089)
![GitHub Repo stars](https://img.shields.io/github/stars/ahmed6913/web-app-pos?style=social)
![GitHub forks](https://img.shields.io/github/forks/ahmed6913/web-app-pos?style=social)


<img width="1712" height="1417" alt="deepseek_mermaid_20250721_748394" src="https://github.com/user-attachments/assets/d1ca8bb4-88ed-42ba-b27d-c92e38835636" />


- Notion link - https://www.notion.so/Lazarus-Mint-1f46368c9a0a80e0ade4fe18a51656d4?source=copy_link
<br>
- UI Mockups - https://excalidraw.com/#json=mYbAm7ox2wrVI1ZiG0uFS,BCOM2v3S19dFFIj4OUUE0w
<br>
- View live on - https://nft-marketplace-81f39.web.app/

### Admin % web-app section 

- Git repo - https://github.com/ahmed6913/NFT-Marketplace-admin.git
- Git repo - https://github.com/ahmed6913/web-app-pos.git

### Tech stack

### 🔧 **Frontend (Client-Side)**

- **React** – UI framework
- **Tailwind CSS** – Styling and responsive design
- **Web3.js / Ethers.js** – Connect to the Ethereum blockchain
- **Wallet Integration** – MetaMask (for NFT interaction)

### 🔧 **Backend**

- **Firebase** (BaaS)
    - Firebase Auth – User authentication
    - Firestore – Realtime database
    - Firebase Functions – Serverless backend logic (minting logic, etc.)
    - Firebase Hosting – Hosting your web app (optional)

### 🔧 **Blockchain Layer**

- **Solidity Smart Contracts** – For NFT minting, rewards, and marketplace
- **Ethereum Testnet** (e.g., Goerli or Sepolia) – For development/testing
- Hardhat/Truffle - For development
- **NFT Standard** – ERC-721 or ERC-1155
- **Storage**: IPFS (via NFT.Storage or Pinata)

Deployment Instructions

Follow these steps to run the Lazarus Mint NFT Marketplace locally or deploy it for production.

### 📦 Prerequisites

Make sure you have the following installed:

- Node.js >= 16
- npm or yarn
Optional: Firebase CLI for Firestore/Storage operations

### 🛠️ Local Development

1. Clone the repository
```
git clone https://github.com/your-username/nft-marketplace.git
cd nft-marketplace
```
2. Install dependencies
```
npm install
# or
yarn install
```
3. Set up environment variables

Create a .env file in the root directory and add:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```
4. Run the development server
```
npm start
# or
yarn start
```
App will be available at: http://localhost:3000

### **DevOps**

- The application has been dockerise (https://hub.docker.com/r/saim777121/nft-marketplace) follow the instruction to run the dockerise application on your local machine and has basic GitHub CI/CD pipline and deployed on firebase hosting 

### Community 

- Join Community - https://discord.gg/3dvyMzNp

## 📄 License

This project is **NOT LICENSE FOR REUSE OR COPY**.  
All rights reserved © 2025 [shaikh saim].  
You may not copy, distribute, or modify any part of this project without explicit permission.
