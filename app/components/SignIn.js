import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db, storage } from '../services/initializeFirebase';
import styles from '../styles/SignIn.module.css'

const SignInPage = ({ setUser }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      setUser(userCredential.user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSignIn}>
        <div className={styles.card}>
        <img>
        {/* need to add logo */}
        </img>
      <h2>Sign in to your account</h2>
      <div>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Username"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
