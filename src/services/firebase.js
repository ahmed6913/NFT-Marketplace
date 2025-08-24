// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  setDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  where,
  getDocs
} from 'firebase/firestore';

// Firebase configuration - replace with your config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/**
 * Chat service functions
 */

// Generate chat ID from two wallet addresses
export const generateChatId = (wallet1, wallet2) => {
  const addresses = [wallet1.toLowerCase(), wallet2.toLowerCase()].sort();
  return `${addresses[0]}_${addresses[1]}`;
};

// Create or get existing chat
export const createChat = async (wallet1, wallet2) => {
  try {
    const chatId = generateChatId(wallet1, wallet2);
    const chatRef = doc(db, 'chats', chatId);
    
    await setDoc(chatRef, {
      participants: [wallet1.toLowerCase(), wallet2.toLowerCase()],
      createdAt: serverTimestamp(),
      lastMessage: null,
      lastMessageTime: null
    }, { merge: true });
    
    return chatId;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatId, sender, content, encryptedContent) => {
  try {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    
    await addDoc(messagesRef, {
      sender: sender.toLowerCase(),
      content: encryptedContent, // Store encrypted content
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    });
    
    // Update chat with last message info
    const chatRef = doc(db, 'chats', chatId);
    await setDoc(chatRef, {
      lastMessage: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
      lastMessageTime: serverTimestamp()
    }, { merge: true });
    
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Listen to messages in real-time
export const subscribeToMessages = (chatId, callback) => {
  const messagesRef = collection(db, 'chats', chatId, 'messages');
  const q = query(messagesRef, orderBy('timestamp', 'asc'));
  
  return onSnapshot(q, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(messages);
  });
};

// Get user's chats
export const getUserChats = async (walletAddress) => {
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(
      chatsRef, 
      where('participants', 'array-contains', walletAddress.toLowerCase())
    );
    
    const snapshot = await getDocs(q);
    const chats = [];
    
    snapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return chats;
  } catch (error) {
    console.error('Error getting user chats:', error);
    throw error;
  }
};

// Subscribe to user's chats
export const subscribeToUserChats = (walletAddress, callback) => {
  const chatsRef = collection(db, 'chats');
  const q = query(
    chatsRef, 
    where('participants', 'array-contains', walletAddress.toLowerCase()),
    orderBy('lastMessageTime', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const chats = [];
    snapshot.forEach((doc) => {
      chats.push({
        id: doc.id,
        ...doc.data()
      });
    });
    callback(chats);
  });
};