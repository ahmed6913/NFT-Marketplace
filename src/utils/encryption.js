// src/utils/encryption.js
import { ethers } from 'ethers';

/**
 * Utility functions for message encryption/decryption using wallet signatures
 */

// Generate a shared secret using ECDH
export const generateSharedSecret = async (privateKey, publicKey) => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    const sharedPoint = wallet.signingKey.computeSharedSecret(publicKey);
    return ethers.keccak256(sharedPoint);
  } catch (error) {
    console.error('Error generating shared secret:', error);
    throw error;
  }
};

// Base64 + XOR encryption (safer for UTF-8)
export const encryptMessage = (message, key) => {
  try {
    // Convert message to base64 first to ensure safe encoding
    const messageBase64 = btoa(unescape(encodeURIComponent(message)));
    const messageBytes = ethers.toUtf8Bytes(messageBase64);

    // Convert string key to bytes using keccak256 hash
    const keyHash = ethers.keccak256(ethers.toUtf8Bytes(key));
    const keyBytes = ethers.getBytes(keyHash);
    const encrypted = new Uint8Array(messageBytes.length);

    for (let i = 0; i < messageBytes.length; i++) {
      encrypted[i] = messageBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    return ethers.hexlify(encrypted);
  } catch (error) {
    console.error('Error encrypting message:', error);
    throw error;
  }
};

// Base64 + XOR decryption
export const decryptMessage = (encryptedHex, key) => {
  try {
    const encryptedBytes = ethers.getBytes(encryptedHex);
    // Convert string key to bytes using keccak256 hash (same as encryption)
    const keyHash = ethers.keccak256(ethers.toUtf8Bytes(key));
    const keyBytes = ethers.getBytes(keyHash);
    const decrypted = new Uint8Array(encryptedBytes.length);

    for (let i = 0; i < encryptedBytes.length; i++) {
      decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    // Convert back from bytes to string, then decode base64
    const decryptedString = ethers.toUtf8String(decrypted);
    const originalMessage = decodeURIComponent(escape(atob(decryptedString)));

    return originalMessage;
  } catch (error) {
    console.error('Error decrypting message:', error);
    throw error;
  }
};

// Get public key from wallet address (requires signature)
export const getPublicKeyFromSignature = async (signer, message = "Get public key for chat") => {
  try {
    const signature = await signer.signMessage(message);
    const messageHash = ethers.hashMessage(message);
    const publicKey = ethers.SigningKey.recoverPublicKey(messageHash, signature);
    return publicKey;
  } catch (error) {
    console.error('Error getting public key:', error);
    throw error;
  }
};

// Utility to shorten wallet addresses for display
export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};