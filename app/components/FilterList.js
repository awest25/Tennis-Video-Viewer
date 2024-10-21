import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router' // Assuming Next.js for routing
import styles from '../styles/FilterList.module.css'
import nameMap from '../services/nameMap.js'

const FilterList = ({
  pointsData,
  filterList,
  setFilterList,
  showPercent,
  showCount
}) => {
  const router = useRouter()

  // Function to update URL with filters
  const updateUrlWithFilters = (filters) => {
    const searchParams = new URLSearchParams()

    filters.forEach(([key, value]) => {
      searchParams.append(key, value)
    })

    router.replace(
      { pathname: router.pathname, query: searchParams.toString() },
      undefined,
      { shallow: true }
    )
  }

  // Parse filters from URL when the component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const initialFilters = []

    urlParams.forEach((value, key) => {
      initialFilters.push([key, value])
    })

    if (initialFilters.length > 0) {
      setFilterList(initialFilters)
    }
  }, [setFilterList])

  // Update URL whenever the filterList changes
  useEffect(() => {
    updateUrlWithFilters(filterList)
  }, [filterList])

  const keys = Object.keys(nameMap).filter(
    (key) =>
      pointsData &&
      pointsData.some((point) =>
        Object.prototype.hasOwnProperty.call(point, key)
      )
  )
  const uniqueValues = {}

  keys.forEach((key) => {
    uniqueValues[key] = [
      ...new Set(pointsData.map((point) => point[key]))
    ].sort()
  })

  const [openKey, setOpenKey] = useState(null)

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

  const countFilteredPointsForValue = (key, value) => {
    return pointsData.filter((point) => point[key] === value).length
  }

  const countFilteredPointsTotal = (key) => {
    return pointsData.reduce((total, point) => {
      if (point[key] !== '' && point[key] !== null) {
        return total + 1
      }
      return total
    }, 0)
  }

  const isActiveFilter = (key, value) => {
    return filterList.some(
      ([filterKey, filterValue]) => filterKey === key && filterValue === value
    )
  }

  return (
    <>
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
                              e.stopPropagation()
                              if (isActiveFilter(key, value)) {
                                removeFilter(key, value)
                              } else {
                                addFilter(key, value)
                              }
                            }}
                          >
                            <li>{value}</li>
                            {showPercent && value && (
                              <li>
                                {Math.round(
                                  (countFilteredPointsForValue(key, value) /
                                    Math.round(countFilteredPointsTotal(key))) *
                                    100
                                )}
                                %
                              </li>
                            )}
                            {showCount && value && (
                              <li>
                                {countFilteredPointsForValue(key, value)} /{' '}
                                {Math.round(countFilteredPointsTotal(key))}
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

export default FilterList
