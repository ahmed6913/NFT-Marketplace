import React, { useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
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
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg text-indigo-900 bg-white placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-white text-white font-semibold py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition"
        >
          Log In with Google
        </button>

        <p className="text-sm text-center text-white">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold underline hover:text-indigo-100">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

