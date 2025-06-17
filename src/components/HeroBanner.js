import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const HeroBanner = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const displayName = user.displayName || user.email;
      setUsername(displayName);
    }
  }, []);

  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-10 rounded-lg shadow-lg mb-8">
      <h1 className="text-3xl font-bold mb-2">Get rewarded with NFTs every time you shop.</h1>
      {username && <p className="text-xl">Welcome back, {username} 👋</p>}
    </section>
  );
};

export default HeroBanner;
