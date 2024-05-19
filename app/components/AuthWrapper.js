import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
// auth wrapper for matchpage as an idea for authorization
const AuthWrapper = ({ children }) => {
  const [autheduser, setAuthedUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthedUser(user);
      } else {
        setAuthedUser(null);
      }
    });

    return () => unsubscribe(); 
  }, []);

  if (!autheduser) {
    return <SignIn setUser={setAuthedUser} />;
  }

  return children;
};

export default AuthWrapper;