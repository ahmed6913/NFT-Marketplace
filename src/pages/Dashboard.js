import React from 'react';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Welcome to your NFT Dashboard 🎉</h1>
      <p>You are logged in.</p>
      <button onClick={logout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
