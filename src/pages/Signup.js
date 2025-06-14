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
    <div style={styles.page}>
      <form onSubmit={handleSignup} style={styles.form}>
        <h2 style={styles.title}>Create Your Account</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button
          style={loading ? styles.buttonDisabled : styles.button}
          type="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignup}
          style={styles.googleButton}
        >
          
          Sign Up with Google
        </button>

        <p style={styles.footerText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#e9f0fb',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  form: {
    backgroundColor: 'white',
    padding: 40,
    borderRadius: 12,
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
    maxWidth: 420,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: '#222',
  },
  title: {
    marginBottom: 28,
    fontWeight: 700,
    fontSize: 28,
    textAlign: 'center',
    color: '#007bff',
  },
  input: {
    padding: 16,
    marginBottom: 20,
    border: '1.8px solid #007bff',
    borderRadius: 8,
    fontSize: 16,
    color: '#004085',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
    padding: 16,
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 6px 12px rgba(0, 123, 255, 0.5)',
    transition: 'background-color 0.3s ease',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#a5c9ff',
    color: '#f0f0f0',
    fontWeight: 700,
    fontSize: 18,
    padding: 16,
    border: 'none',
    borderRadius: 10,
    cursor: 'not-allowed',
    boxShadow: 'none',
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: 'white',
    border: '1.5px solid #007bff',
    color: '#007bff',
    fontWeight: 600,
    fontSize: 16,
    padding: 14,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#842029',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 28,
    textAlign: 'center',
    color: '#004085',
    fontWeight: 500,
    fontSize: 14,
  },
  link: {
    color: '#007bff',
    fontWeight: 700,
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default Signup;
