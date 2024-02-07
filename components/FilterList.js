// components/FilterList.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/FilterList.module.css';
// This file renammes columns to more human-readable names
import nameMap from '../services/nameMap.js';

const FilterList = ({ pointsData, filterList, setFilterList }) => {
    const keys = Object.keys(pointsData[0] || {}).sort(); // Sort the keys array
    const uniqueValues = {};

    // Gather unique values for each key
    keys.forEach((key) => {
        uniqueValues[key] = [...new Set(pointsData.map((point) => point[key]))].sort();
    });
    
    // State for collapsed keys
    const [collapsedKeys, setCollapsedKeys] = useState(keys);

    // Effect to reset collapsed keys when pointsData changes
    useEffect(() => {
        setCollapsedKeys(keys);
    }, [pointsData]);

    const toggleCollapse = (key) => {
        if (collapsedKeys.includes(key)) {
            setCollapsedKeys(collapsedKeys.filter((k) => k !== key));
        } else {
            setCollapsedKeys([...collapsedKeys, key]);
        }
    };

    const addFilter = (key, value) => {
        const isDuplicate = filterList.some(([filterKey, filterValue]) => filterKey === key && filterValue === value);
        if (!isDuplicate) {
            setFilterList([...filterList, [key, value]]);
        }
    }
    
    //count filtered points
    const countFilteredPointsForValue = (key, value) => {
        return pointsData.filter(point => point[key] === value).length;
    };
    // Sort the filterList array in alphabetical order
    const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]));

    return (
        <>
            <div>
                <ul className={styles.availableFilterList}>
                    {keys.map((key) => {
                        // Check if key is in the nameMap
                        if (nameMap.hasOwnProperty(key)) {
                            return (
                                <div className={styles.availableFilterItem} key={key} onClick={() => toggleCollapse(key)}>
                                    <li>
                                        <strong>
                                            {nameMap[key]}
                                        </strong>
                                        <ul className={styles.filterValuesList} style={{ display: collapsedKeys.includes(key) ? 'none' : 'block' }}>
                                            {uniqueValues[key].map((value) => (
                                                <div className={styles.filterValueItem} key={value} style={{ cursor: 'pointer' }} onClick={() => addFilter(key, value)}>
                                                    <li >{value}</li>
                                                    {value && (
                                                        <li>{Math.round((countFilteredPointsForValue(key, value) / pointsData.length) * 100)}%</li>                                                    
                                                    )}
                                                </div>
                                                    
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
        </>
    );
}

export default FilterList;
