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

// Simple hex-based encryption (more reliable)
export const encryptMessage = (message, key) => {
  try {
    // Convert message to hex string first
    const messageHex = ethers.hexlify(ethers.toUtf8Bytes(message));

    // Convert string key to hash
    const keyHash = ethers.keccak256(ethers.toUtf8Bytes(key));
    const keyBytes = ethers.getBytes(keyHash);

    // Convert hex message to bytes
    const messageBytes = ethers.getBytes(messageHex);
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

// Simple hex-based decryption
export const decryptMessage = (encryptedHex, key) => {
  try {
    const encryptedBytes = ethers.getBytes(encryptedHex);

    // Convert string key to hash (same as encryption)
    const keyHash = ethers.keccak256(ethers.toUtf8Bytes(key));
    const keyBytes = ethers.getBytes(keyHash);
    const decrypted = new Uint8Array(encryptedBytes.length);

    for (let i = 0; i < encryptedBytes.length; i++) {
      decrypted[i] = encryptedBytes[i] ^ keyBytes[i % keyBytes.length];
    }

    // Convert decrypted bytes back to hex, then to string
    const decryptedHex = ethers.hexlify(decrypted);
    const originalMessage = ethers.toUtf8String(decryptedHex);

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