// components/FilterList.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/FilterList.module.css';
// This file renammes columns to more human-readable names
import nameMap from '../services/nameMap.js';

const FilterList = ({ pointsData, filterList, setFilterList }) => {
    const keys = Object.keys(nameMap); // Sort the keys array
    const uniqueValues = {};

    // Gather unique values for each key
    keys.forEach((key) => {
        uniqueValues[key] = [];
        if (pointsData && pointsData.length > 0 && pointsData.some(point => point.hasOwnProperty(key))) {
            uniqueValues[key] = [...new Set(pointsData.map((point) => point[key]))].sort();
        }
    });
    
    // State for the open key
    const [openKey, setOpenKey] = useState(null);

    // Effect to reset open key when pointsData changes
    useEffect(() => {
        setOpenKey(null);
    }, [pointsData]);

    const toggleOpen = (key) => {
        if (openKey === key) {
            setOpenKey(null);
        } else {
            setOpenKey(key);
        }
    };

    const addFilter = (key, value) => {
        const isDuplicate = filterList.some(([filterKey, filterValue]) => filterKey === key && filterValue === value);
        if (!isDuplicate) {
            setFilterList([...filterList, [key, value]]);
        }
    }
    
    const removeFilter = (key, value) => {
        const updatedFilterList = filterList.filter(([filterKey, filterValue]) => !(filterKey === key && filterValue === value));
        setFilterList(updatedFilterList);
    };

    // Function to determine if the value is an active filter
    const isActiveFilter = (key, value) => {
        return filterList.some(([filterKey, filterValue]) => filterKey === key && filterValue === value);
    };

    // Sort the filterList array in alphabetical order
    const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]));

    return (
        <div>
            <div className={styles.activeFilterListContainer}>
                Active Filters:
                <ul className={styles.activeFilterList}>
                    {sortedFilterList.map(([key, value]) => (
                        <li className={styles.activeFilterItem} key={`${key}-${value}`} style={{ cursor: 'pointer' }} onClick={() => removeFilter(key, value)}>
                            {nameMap[key]}: {value}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={styles.availableFilterList}>
                {keys.map((key) => {
                    // Check if key is in the nameMap
                    if (nameMap.hasOwnProperty(key)) {
                        return (
                            <div className={styles.availableFilterItem} key={key} onClick={() => toggleOpen(key)}>
                                <li>
                                    <strong>
                                        {nameMap[key]}
                                    </strong>
                                    <ul className={styles.filterValuesList} style={{ display: openKey === key ? 'block' : 'none' }}>
                                        {uniqueValues[key].map((value) => (
                                            value !== '' && (

                                            <li className={styles.filterValueItem} key={value} style={{
                                                cursor: 'pointer',
                                                backgroundColor: isActiveFilter(key, value) ? '#8BB8E8' : ''
                                            }}
                                            onClick={(e) => {
                                                    e.stopPropagation(); // Prevent the click from toggling the open key
                                                    if (isActiveFilter(key, value)) {
                                                        removeFilter(key, value);
                                                    } else {
                                                        addFilter(key, value);
                                                    }
                                                }}>{value}</li>

                                            )
                                        ))}
                                    </ul>
                                </li>
                            </div>
                        );
                    } else {
                        return null; // Skip rendering if key is not in the map
                    }
                })}
            </ul>
        </div>
    );
}

export default FilterList;
