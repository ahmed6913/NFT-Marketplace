import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Create Your Account</h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg text-indigo-900 bg-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
          className="w-full px-4 py-3 rounded-lg text-indigo-900 bg-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        {error && (
          <p className="bg-white text-red-600 px-4 py-2 rounded-lg text-center font-medium">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-indigo-600 bg-white hover:bg-indigo-50 transition ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full border border-white text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
        >
          Sign Up with Google
        </button>

        <p className="text-sm text-center text-white">
          Already have an account?{' '}
          <Link to="/login" className="font-bold underline hover:text-indigo-100">
            Log in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
