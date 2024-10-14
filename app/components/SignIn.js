// components/SignIn.js
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import styles from '../styles/SignIn.module.css'
import { useAuth } from './AuthWrapper'

const SignInPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const { authUser, userProfile, handleSignOut } = useAuth() // Use useAuth hook to get the user and sign-out function

  console.log(error)
  console.log(userProfile)

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()
      const email = `${credentials.username}@ucla.edu` // Append @ucla.edu to the username
      await signInWithEmailAndPassword(auth, email, credentials.password)
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.leftTitle}>
          <h1>BSA | Tennis Consulting</h1>
        </div>
        <div className={styles.rightTitle}>
          {authUser ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button>Sign In</button>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <form onSubmit={handleSignIn}>
          <div className={styles.card}>
            <img>{/* Add logo if needed */}</img>
            <h2>Sign in to your account</h2>
            <div>
              <input
                type="text"
                name="username"
                value={credentials.username}
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
            <div style={{ color: 'grey', fontSize: '0.7rem' }}>
              <p>
                Need Help?{' '}
                <a
                  href="mailto:uclatennisconsulting@gmail.com"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  <b>Contact Us</b>
                </a>
              </p>
              {/* add contact details */}
              <p>To demo this page, use:</p>
              <ul>Username: demo</ul>
              <ul>Password: demo</ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
