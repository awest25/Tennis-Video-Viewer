import React, { useEffect, useState } from 'react'
import styles from '../styles/FilterList.module.css'
// This file renames columns to more human-readable names
import nameMap from '../services/nameMap.js'

const FilterList = ({
  pointsData,
  filterList,
  setFilterList,
  showPercent,
  showCount,
  selectedPlayer, // New state for selected player
  setSelectedPlayer // New state setter for selected player
}) => {
  // Function to filter pointsData based on the selected player
  const filterPointsByPlayer = (points, player) => {
    return points.filter((point) => point[`player${player}Name`] !== null)
  }

  const playerFilteredData = filterPointsByPlayer(pointsData, selectedPlayer)

  // only keep relevant keys
  const keys = Object.keys(nameMap).filter(
    (key) =>
      playerFilteredData &&
      playerFilteredData.some((point) =>
        Object.prototype.hasOwnProperty.call(point, key)
      )
  )
  const uniqueValues = {}

  // Iterate through filtered keys and populate uniqueValues
  keys.forEach((key) => {
    uniqueValues[key] = [
      ...new Set(playerFilteredData.map((point) => point[key]))
    ].sort()
  })

  // State for the open key
  const [openKey, setOpenKey] = useState(null)

  // Effect to reset open key when pointsData changes
  useEffect(() => {
    setOpenKey(null)
  }, [pointsData])

  const toggleOpen = (key) => {
    if (openKey === key) {
      setOpenKey(null)
    } else {
      setOpenKey(key)
    }
  }

  const addFilter = (key, value) => {
    const isDuplicate = filterList.some(
      ([filterKey, filterValue]) => filterKey === key && filterValue === value
    )
    if (!isDuplicate) {
      setFilterList([...filterList, [key, value]])
    }
  }

  const removeFilter = (key, value) => {
    const updatedFilterList = filterList.filter(
      ([filterKey, filterValue]) =>
        !(filterKey === key && filterValue === value)
    )
    setFilterList(updatedFilterList)
  }

  // Counts points for each filter
  const countFilteredPointsForValue = (key, value) => {
    return playerFilteredData.filter((point) => point[key] === value).length
  }

  const countFilteredPointsTotal = (key) => {
    return playerFilteredData.reduce((total, point) => {
      // Check if the value attribute is not an empty string
      if (point[key] !== '' && point[key] !== null) {
        return total + 1 // Add 1 to the total if this point has a value specific to this category (key)
      }
      // Otherwise, just return the current total without adding anything
      return total
    }, 0)
  }

  // Function to determine if the value is an active filter
  const isActiveFilter = (key, value) => {
    return filterList.some(
      ([filterKey, filterValue]) => filterKey === key && filterValue === value
    )
  }

  // Render the player selection buttons
  return (
    <>
      <div className={styles.playerSelection}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg"
          alt="Player 1"
          onClick={() => setSelectedPlayer(1)}
          className={selectedPlayer === 1 ? styles.activePlayer : ''}
        />
        <img
          src=" https://ittavern.com/images/blog/url-explained.png"
          alt="Player 2"
          onClick={() => setSelectedPlayer(2)}
          className={selectedPlayer === 2 ? styles.activePlayer : ''}
        />
      </div>

      <div>
        <ul className={styles.availableFilterList}>
          {keys.map((key) => {
            return (
              <div
                className={styles.availableFilterItem}
                key={key}
                onClick={() => toggleOpen(key)}
              >
                <li>
                  <strong>{nameMap[key]}</strong>
                  <ul
                    className={styles.filterValuesList}
                    style={{ display: openKey === key ? 'block' : 'none' }}
                  >
                    {uniqueValues[key].map(
                      (value) =>
                        value !== '' &&
                        value !== null && (
                          <div
                            className={styles.filterValueItem}
                            key={value}
                            style={{
                              cursor: 'pointer',
                              backgroundColor: isActiveFilter(key, value)
                                ? '#8BB8E8'
                                : ''
                            }}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent the click from toggling the open key
                              if (isActiveFilter(key, value)) {
                                removeFilter(key, value)
                              } else {
                                addFilter(key, value)
                              }
                            }}
                          >
                            <li>{value}</li>
                            {/* Point Percentage */}
                            {showPercent && value && (
                              <li>
                                {Math.round(
                                  (countFilteredPointsForValue(key, value) /
                                    countFilteredPointsTotal(key)) *
                                    100
                                )}
                                %
                              </li>
                            )}
                            {/* Point Count */}
                            {showCount && value && (
                              <li>
                                {countFilteredPointsForValue(key, value)} /{' '}
                                {countFilteredPointsTotal(key)}
                              </li>
                            )}
                          </div>
                        )
                    )}
                  </ul>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default FilterList // components/FilterList.js
