# Firestore Security Rules

Add these rules to your Firestore Database in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Chat documents - users can only access chats they participate in
    match /chats/{chatId} {
      allow read, write: if request.auth != null && 
        resource.data.participants.hasAny([request.auth.token.wallet_address]) ||
        request.resource.data.participants.hasAny([request.auth.token.wallet_address]);
      
      // Messages subcollection
      match /messages/{messageId} {
        allow read, write: if request.auth != null &&
          get(/databases/$(database)/documents/chats/$(chatId)).data.participants.hasAny([request.auth.token.wallet_address]);
      }
    }
  }
}
```

## Note: 
Since we're using wallet addresses instead of Firebase Auth, you may want to use simpler rules for development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // WARNING: Only for development!
    }
  }
}
```

For production, implement proper authentication with wallet signatures or use Firebase Auth with custom tokens.