'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/initializeFirebase';
import { getUserProfile } from '../services/userInfo';
import SignIn from './SignIn';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (user) {
        const userProfile = await getUserProfile(user.uid);
        setUserProfile(userProfile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      setAuthUser(null);
      setUserProfile(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div style={{ width: '100%' }}>
      <AuthContext.Provider value={{ authUser, userProfile, handleSignOut }}>
        {authUser ? children : <SignIn />}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => useContext(AuthContext);
