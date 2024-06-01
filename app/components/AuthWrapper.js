'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/initializeFirebase';
import SignIn from './SignIn';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div style={{width: '100%'}}>
    <AuthContext.Provider value={{ user, handleSignOut }}>
      {user ? children : <SignIn />}
    </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
