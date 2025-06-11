import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/firebase';
import { useState, useEffect } from 'react';

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

  if (loadingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {/* Tailwind Test Banner - will Remove it later */}
      <div className="bg-green-500 text-white p-4 text-center">
        Tailwind is working! (Remove this after testing)
      </div> 

      <Routes> 
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
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