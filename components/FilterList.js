// components/FilterList.js

import React, { useEffect, useState } from 'react';
import styles from '../styles/FilterList.module.css';

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
    
    const removeFilter = (key, value) => {
        const updatedFilterList = filterList.filter(([filterKey, filterValue]) => !(filterKey === key && filterValue === value));
        setFilterList(updatedFilterList);
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
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            </div>
            <ul className={styles.availableFilterList}>
                {keys.map((key) => (
                    <div className={styles.availableFilterItem}>
                        <li key={key}>
                            <strong onClick={() => toggleCollapse(key)} style={{ cursor: 'pointer' }}>{key}</strong>
                            <ul className={styles.list} style={{ display: collapsedKeys.includes(key) ? 'none' : 'block'}}>
                                {uniqueValues[key].map((value) => (
                                    <li key={value} style={{ cursor: 'pointer' }} onClick={() => addFilter(key, value)}>{value}</li>
                                ))}
                            </ul>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default FilterList;
