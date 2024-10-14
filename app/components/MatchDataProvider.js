'use client'
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react'
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from '../services/initializeFirebase.js'
import { useAuth } from './AuthWrapper.js'

const MatchDataContext = createContext()

export const MatchDataProvider = ({ children }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userProfile } = useAuth()

  const fetchMatches = useCallback(async () => {
    if (userProfile && userProfile.collections) {
      setLoading(true)
      setError(null)
      const allMatches = []

      try {
        for (const col of userProfile.collections) {
          const colRef = collection(db, col)
          const querySnapshot = await getDocs(colRef)

          querySnapshot.docs.forEach((doc) => {
            allMatches.push({
              id: doc.id,
              collection: col, // Track which collection this match belongs to
              ...doc.data()
            })
          })
        }

        setMatches(allMatches)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
  }, [userProfile])

  const updateMatch = useCallback(
    async (matchId, updatedData) => {
      try {
        // Update the match data locally to reflect the changes immediately
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.id === matchId ? { ...match, ...updatedData } : match
          )
        )

        // Find the match and its collection
        const matchToUpdate = matches.find((match) => match.id === matchId)
        if (!matchToUpdate) {
          throw new Error('Match not found')
        }

        const matchDocRef = doc(db, matchToUpdate.collection, matchId)
        await updateDoc(matchDocRef, updatedData)

        await fetchMatches()
      } catch (err) {
        setError(err)
        console.error('Error updating match:', err)
      }
    },
    [matches, fetchMatches]
  )

  const createMatch = useCallback(
    async (collectionName, newMatchData) => {
      try {
        const newMatch = {
          id: 'temp-id',
          collection: collectionName,
          ...newMatchData
        }

        setMatches((prevMatches) => [...prevMatches, newMatch])

        const colRef = collection(db, collectionName)
        const docRef = await addDoc(colRef, newMatchData)

        await fetchMatches()
      } catch (err) {
        setError(err)
        console.error('Error creating new match:', err)
      }
    },
    [fetchMatches]
  )

  useEffect(() => {
    fetchMatches()
  }, [fetchMatches])

  return (
    <MatchDataContext.Provider
      value={{
        matches,
        loading,
        error,
        refresh: fetchMatches,
        updateMatch,
        createMatch
      }}
    >
      {children}
    </MatchDataContext.Provider>
  )
}

export const useMatchData = () => {
  const context = useContext(MatchDataContext)

  if (!context) {
    throw new Error('useMatchData must be used within a MatchDataProvider')
  }

  const { matches, loading, error, refresh, updateMatch, createMatch } = context

  useEffect(() => {
    refresh()
  }, [refresh])

  return { matches, loading, error, refresh, updateMatch, createMatch }
}
