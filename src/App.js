import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import OwnedNFTs from './pages/OwnedNFTs';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';


import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';

const App = () => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert('Logged out successfully'))
      .catch((err) => alert('Logout failed: ' + err.message));
  };

  const navigateTo = (path) => {
    window.location.href = path; // 👈 simple redirect
  };

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {user && (
        <Navbar
          onLogout={handleLogout}
          onNavigate={navigateTo}
          onConnectWallet={() => alert('Connect Wallet clicked!')}
        />
      )}

      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/marketplace" element={user ? <Marketplace /> : <Navigate to="/login" />} />
        <Route path="/ownednfts" element={user ? <OwnedNFTs /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
       
      </Routes>
    </Router>
  );
};

export default App;

// for testing tailwind css configration

//  {/* Tailwind Test Banner - Remove later */}
//    <div className="bg-green-500 text-white p-4 text-center">
//    Tailwind is working! (Remove this after testing)
// </div> 