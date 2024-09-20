'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useMatchData } from './MatchDataProvider'
import styles from '../styles/Dashboard.module.css'
import DashTileContainer from './DashTileContainer'
import getTeams from '@/app/services/getTeams.js'
import RosterList from './RosterList.js'
import Select from 'react-select'
import FuzzySearch from './FuzzySearch'
import SearchPlaceholder from './SearchPlaceholder'
import { SelectStyles } from './SelectStyles'
// Import sample data to test data fetching
import matchData from '../(interactive)/dashboard/sampleData'

// Extract date from match name
const extractDateFromName = (name) => {
  const dateRegex = /(\d{1,2})\/(\d{1,2})\/(\d{2})/
  const matchResult = name.match(dateRegex)

  if (!matchResult) return null

  const [month, day, year] = matchResult.slice(1).map(Number)
  const fullYear = year < 50 ? 2000 + year : 1900 + year

  return new Date(fullYear, month - 1, day)
}

// Format date based on type
export const formatDate = (date, formatType) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()

  switch (formatType) {
    case 'MM/DD/YY':
      return `${month}/${day}/${String(year).slice(-2)}`
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`
    case 'MM/DD/YY':
      return `${month}/${day}/${String(year).slice(-2)}`
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`
    default:
      throw new Error(`Unknown format type: ${formatType}`)
  }
}

// Format matches in order of recency
const formatMatches = (matches) =>
  matches
    .filter((match) => match.clientPlayer && match.opponentPlayer)
    .map((match) => {
      const date = extractDateFromName(match.date)
      return {
        ...match,
        date,
        formattedDate: date ? formatDate(date, 'MM/DD/YYYY') : null
      }
    })
    .sort((a, b) => (b.date && a.date ? b.date - a.date : 1))

const Dashboard = () => {
  // const { matches, error } = useMatchData(); // Using the custom hook to access match data
  const matches = matchData // using hardcoded JSON objects
  const router = useRouter()
  const formattedMatches = formatMatches(matchData)
  const { logos } = useDatabase()

  // Group matches by date
  const matchesByDate = formattedMatches.reduce((acc, match) => {
    const matchDate = match.formattedDate
    if (matchDate && !acc[matchDate]) {
      acc[matchDate] = []
    }
    if (matchDate) {
      acc[matchDate].push(match)
    }
    return acc
  }, {})

  // Function to find the closest past date to today
  const getClosestPastDate = () => {
    const today = new Date()
    const pastDates = Object.keys(matchesByDate)
      .map((date) => new Date(date))
      .filter((date) => date <= today)
      .sort((a, b) => today - a)

    return pastDates.length > 0 ? formatDate(pastDates[0], 'MM/DD/YYYY') : null
  }

  // State to manage which dates' matches are being shown
  const [selectedDates, setSelectedDates] = useState([])

  useEffect(() => {
    const closestDate = getClosestPastDate()
    if (closestDate) {
      setSelectedDates([closestDate])
    }
  }, [])

  // Ensure that selected matches are sorted by recency after every selection
  const sortedSelectedDates = [...selectedDates].sort(
    (a, b) => new Date(b) - new Date(a)
  )

  const handleTileClick = (videoId) => {
    router.push(`/matches/${videoId}`)
  }

  const handleCarouselClick = (date) => {
    setSelectedDates((prevDates) =>
      prevDates.includes(date)
        ? prevDates.filter((d) => d !== date)
        : [...prevDates, date]
    )
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>BSA | Tennis Consulting</h1>
        <div className={styles.headerContent}>
          <h2>Dashboard</h2>
          <Select
            placeholder={<SearchPlaceholder />}
            components={{
              DropdownIndicator: () => null, // This removes the dropdown arrow
              IndicatorSeparator: () => null, // This removes the separator next to the arrow
              Menu: () => null // This removes the default menu when a search is preformed
            }}
            styles={SelectStyles}
            options={filteredMatches} // Use filtered matches as options
            onInputChange={handleSearch}
          />
        </div>
      </header>

      <div className={styles.carousel}>
        {Object.keys(matchesByDate).map((date, index) => (
          <div
            key={index}
            className={`${styles.card} ${selectedDates.includes(date) ? styles.active : ''}`}
            onClick={() => handleCarouselClick(date)}
          >
            <div className={styles.cardContent}>
              <img
                src={logos[matchesByDate[date][0].opponentTeam]}
                alt="Team Logo"
                className={styles.logo}
              />
              <span className={styles.matchDate}>
                {formatDate(new Date(date), 'MM/DD/YY')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.matchesSection}>
          {(sortedSelectedDates.length > 0
            ? sortedSelectedDates
            : Object.keys(matchesByDate)
          ).map((selectedDate) => (
            <div key={selectedDate} className={styles.matchSection}>
              <div className={styles.matchContainer}>
                <div className={styles.matchHeader}>
                  <h3>{`${matchesByDate[selectedDate][0].clientTeam} vs ${matchesByDate[selectedDate][0].opponentTeam}`}</h3>
                  <span className={styles.date}>{selectedDate}</span>
                </div>
                <DashTileContainer
                  matches={matchesByDate[selectedDate].filter(
                    (match) => match.singlesDoubles === 'Singles'
                  )}
                  matchType="Singles"
                  onTileClick={handleTileClick}
                />
                <DashTileContainer
                  matches={matchesByDate[selectedDate].filter(
                    (match) => match.singlesDoubles === 'Doubles'
                  )}
                  matchType="Doubles"
                  onTileClick={handleTileClick}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.rosterContainer}>
          <RosterList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
