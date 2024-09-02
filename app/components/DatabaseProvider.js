'use client'
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react'
import getTeams from '../services/getTeams'

const DatabaseContext = createContext()

export const DatabaseProvider = ({ children }) => {
  const [logos, setLogos] = useState(() => {
    const storedLogos = localStorage.getItem('teamLogos')
    return storedLogos ? JSON.parse(storedLogos) : {}
  })
  const [loading, setLoading] = useState(!Object.keys(logos).length)
  const [error, setError] = useState(null)

  const fetchLogos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const teams = await getTeams()
      const logosMap = teams.reduce((acc, team) => {
        acc[team.name] = team.logoUrl
        return acc
      }, {})

      setLogos(logosMap)
      localStorage.setItem('teamLogos', JSON.stringify(logosMap))
    } catch (err) {
      setError(err)
      console.error('Error fetching team logos:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLogos()
  }, [fetchLogos])

  return (
    <DatabaseContext.Provider value={{ logos, loading, error }}>
      {children}
    </DatabaseContext.Provider>
  )
}

export const useDatabase = () => {
  const context = useContext(DatabaseContext)

  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider')
  }

  const { logos, loading, error } = context

  return { logos, loading, error }
}
