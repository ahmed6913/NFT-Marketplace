# Required Dependencies for Chat Feature

## Install these packages:

```bash
npm install firebase ethers lucide-react
```

## Dependencies breakdown:

- **firebase**: For Firestore database and real-time messaging
- **ethers**: For wallet interactions and encryption utilities  
- **lucide-react**: For UI icons (Send, Plus, ArrowLeft, etc.)

## Existing dependencies (should already be installed):
- **wagmi**: For wallet connection
- **@rainbow-me/rainbowkit**: For wallet UI
- **react-router-dom**: For navigation
- **tailwindcss**: For styling

## Firebase Setup Required:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database
3. Update the Firebase config in `src/services/firebase.js` with your project credentials
4. Set up Firestore security rules (see firestore-rules.md)

## Usage:

Add the chat route to your App.js router:

```javascript
import ChatPage from './pages/ChatPage';

// In your router:
<Route path="/chat" element={<ChatPage />} />
```