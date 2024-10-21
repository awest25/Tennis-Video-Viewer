'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import filterListStyles from '../../../styles/FilterList.module.css'
import styles from '../../../styles/Match.module.css'
import VideoPlayer from '../../../components/VideoPlayer'
import FilterList from '../../../components/FilterList'
import PointsList from '../../../components/PointsList'
import ScoreBoard from '../../../components/ScoreBoard'
import MatchTiles from '@/app/components/MatchTiles'
import { useMatchData } from '@/app/components/MatchDataProvider'
import extractSetScores from '@/app/services/extractSetScores'
import ExtendedList from '../../../components/ExtendedList'
import nameMap from '@/app/services/nameMap'

const MatchPage = () => {
  const [matchData, setMatchData] = useState()
  const [filterList, setFilterList] = useState([])
  const [videoObject, setVideoObject] = useState(null)
  const [showPercent, setShowPercent] = useState(false)
  const [showCount, setShowCount] = useState(false)
  const [playingPoint, setPlayingPoint] = useState(null)
  const [showPDF, setShowPDF] = useState(true)
  const [tab, setTab] = useState(1)
  const [bookmarks, setBookmarks] = useState([])
  const [triggerScroll, setTriggerScroll] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState(1)
  const tableRef = useRef(null)
  const iframeRef = useRef(null)

  const { matches, updateMatch } = useMatchData()
  const pathname = usePathname()
  const docId = pathname.substring(pathname.lastIndexOf('/') + 1)

  useEffect(() => {
    const selectedMatch = matches.find((match) => match.id === docId)
    if (selectedMatch) {
      setMatchData(selectedMatch)

      // Set initial bookmarks
      const initialBookmarks = selectedMatch.points.filter(
        (point) => point.bookmarked
      )
      setBookmarks(initialBookmarks)
    }
  }, [matches, docId])

  const handleJumpToTime = (time) => {
    if (videoObject && videoObject.seekTo) {
      videoObject.seekTo(time / 1000, true)
    }
  }

  const handleBookmark = async (point) => {
    const updatedPoints = matchData.points.map((p) => {
      if (p.Name === point.Name) {
        return { ...p, bookmarked: !p.bookmarked }
      }
      return p
    })

    setMatchData((prev) => ({ ...prev, points: updatedPoints }))
    setBookmarks(updatedPoints.filter((p) => p.bookmarked))

    try {
      await updateMatch(docId, { points: updatedPoints })
    } catch (error) {
      console.error('Error updating bookmarks:', error)
    }
  }

  useEffect(() => {
    if (matchData) {
      const points = returnFilteredPoints()
      const sortedPoints = [...points].sort((a, b) => b.Position - a.Position)

      const updateScoreboardWithTime = (time) => {
        const currentPoint = sortedPoints.find(
          (point) => point.Position <= time
        )
        if (currentPoint) {
          setPlayingPoint(currentPoint)
        }
      }

      const intervalId = setInterval(() => {
        if (videoObject && videoObject.getCurrentTime) {
          const currentTime = videoObject.getCurrentTime() * 1000
          updateScoreboardWithTime(currentTime)
        }
      }, 200)

      return () => clearInterval(intervalId)
    }
  }, [videoObject, matchData])

  useEffect(() => {
    if (triggerScroll && !showPDF) {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: 'smooth' })
      }
      setTriggerScroll(false)
    }
  }, [triggerScroll, showPDF])

  const returnFilteredPoints = () => {
    let filteredPoints = matchData.points
    const filterMap = new Map()

    filterList.forEach((filter) => {
      const [key, value] = filter
      if (filterMap.has(key)) {
        filterMap.get(key).push(value)
      } else {
        filterMap.set(key, [value])
      }
    })

    filterMap.forEach((values, key) => {
      filteredPoints = filteredPoints.filter((point) =>
        values.length > 1
          ? values.includes(point[key])
          : point[key] === values[0]
      )
    })

    return filteredPoints
  }

  const removeFilter = (key, value) => {
    const updatedFilterList = filterList.filter(
      ([filterKey, filterValue]) =>
        !(filterKey === key && filterValue === value)
    )
    setFilterList(updatedFilterList)
  }

  const scrollToDetailedList = () => {
    setShowPDF(false)
    setTriggerScroll(true)
  }

  const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]))

  function addBorderRadius() {
    console.log('adding border radius')
    const anyIframe = document.getElementById('player')
    if (anyIframe) {
      console.log('found iframe:', anyIframe)
      anyIframe.style.borderRadius = '10px'
    }
  }

  const matchSetScores = matchData ? extractSetScores(matchData.points) : {}

  return (
    <div className={styles.container}>
      {matchData && (
        <>
          <MatchTiles
            matchName={matchData.name}
            clientTeam={matchData.clientTeam}
            opponentTeam={matchData.opponentTeam}
            matchDetails={matchData.matchDetails}
            {...matchSetScores}
          />
          <div className={styles.headerRow}>
            <div className={styles.titleContainer}>
              <h2>{matchData.name}</h2>
            </div>
          </div>
          <div className={styles.mainContent}>
            <div className={styles.videoPlayer}>
              <div ref={iframeRef}>
                <VideoPlayer
                  id="player"
                  videoId={matchData.videoId}
                  setVideoObject={setVideoObject}
                  onReady={addBorderRadius}
                />
              </div>
            </div>
            <div className={styles.sidebar}>
              <div className={filterListStyles.activeFilterListContainer}>
                Active Filters:
                <ul className={filterListStyles.activeFilterList}>
                  {sortedFilterList.map(([key, value]) => (
                    <li
                      className={filterListStyles.activeFilterItem}
                      key={`${key}-${value}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => removeFilter(key, value)}
                    >
                      {nameMap[key]}: {value}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setTab(0)}
                className={
                  tab === 0
                    ? styles.toggle_buttonb_active
                    : styles.toggle_buttonb_inactive
                }
              >
                Filters
              </button>
              <button
                onClick={() => setTab(1)}
                className={
                  tab === 1
                    ? styles.toggle_button_neutral_active
                    : styles.toggle_button_neutral_inactive
                }
              >
                Points
              </button>
              <button
                onClick={() => setTab(2)}
                className={
                  tab === 2
                    ? styles.toggle_buttona_active
                    : styles.toggle_buttona_inactive
                }
              >
                Bookmarks
              </button>
              {tab === 0 && (
                <div className={styles.sidebox}>
                  <div className={filterListStyles.optionsList}>
                    <div>
                      <input
                        type="radio"
                        id="defaultRadio"
                        checked={!showCount && !showPercent}
                        onChange={() => {
                          setShowPercent(false)
                          setShowCount(false)
                        }}
                      />
                      <label htmlFor="defaultRadio">Default</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="percentRadio"
                        checked={showPercent}
                        onChange={() => {
                          setShowPercent(true)
                          setShowCount(false)
                        }}
                      />
                      <label htmlFor="percentRadio">Show Percent</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="countRadio"
                        checked={showCount}
                        onChange={() => {
                          setShowPercent(false)
                          setShowCount(true)
                        }}
                      />
                      <label htmlFor="countRadio">Show Count</label>
                    </div>
                  </div>
                  <div className={styles.sidebar}>
                    {/* Pass selectedPlayer to FilterList */}
                    <FilterList
                      pointsData={matchData.points}
                      filterList={filterList}
                      setFilterList={setFilterList}
                      showPercent={showPercent}
                      showCount={showCount}
                      selectedPlayer={selectedPlayer}
                      setSelectedPlayer={setSelectedPlayer}
                    />
                  </div>
                </div>
              )}
              {tab === 1 && (
                <div className={styles.sidebox}>
                  <div className={styles.sidecontent}>
                    <PointsList
                      pointsData={returnFilteredPoints()}
                      onPointSelect={handleJumpToTime}
                      onBookmark={handleBookmark}
                      clientTeam={matchData.clientTeam}
                      opponentTeam={matchData.opponentTeam}
                    />
                  </div>
                  <div style={{ padding: '0.5vw', paddingLeft: '5vw' }}>
                    <button
                      className={styles.viewDetailedListButton}
                      onClick={scrollToDetailedList}
                    >
                      View Detailed List
                    </button>
                  </div>
                </div>
              )}
              {tab === 2 && (
                <div className={styles.sidebox}>
                  <div className={styles.sidecontent}>
                    <PointsList
                      pointsData={bookmarks}
                      onPointSelect={handleJumpToTime}
                      onBookmark={handleBookmark}
                      clientTeam={matchData.clientTeam}
                      opponentTeam={matchData.opponentTeam}
                    />
                  </div>
                  <div style={{ padding: '0.5vw', paddingLeft: '5vw' }}>
                    <button
                      className={styles.viewDetailedListButton}
                      onClick={scrollToDetailedList}
                    >
                      View Detailed List
                    </button>
                  </div>
                </div>
              )}
              <div className="scoreboard">
                <ScoreBoard
                  names={matchData.name}
                  playData={playingPoint}
                  {...matchSetScores}
                />
              </div>
            </div>
          </div>
          <div className={styles.toggle}>
            <button
              onClick={() => setShowPDF(true)}
              className={
                showPDF
                  ? styles.toggle_buttonb_inactive
                  : styles.toggle_buttonb_active
              }
            >
              Key Stats & Visuals
            </button>
            <button
              onClick={() => setShowPDF(false)}
              className={
                showPDF
                  ? styles.toggle_buttona_active
                  : styles.toggle_buttona_inactive
              }
            >
              Points
            </button>
            {showPDF ? (
              <iframe
                className={styles.pdfView}
                src={matchData.pdfUrl}
                width="90%"
                height="1550"
              />
            ) : (
              <div ref={tableRef} className={styles.ExtendedList}>
                <ExtendedList
                  pointsData={returnFilteredPoints()}
                  clientTeam={matchData.clientTeam}
                  opponentTeam={matchData.opponentTeam}
                  onPointSelect={handleJumpToTime}
                  iframe={iframeRef}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MatchPage
