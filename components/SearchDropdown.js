import React, { useState, useEffect } from 'react';
import Select, {components} from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import transformData from '../services/transformData.js';

const SearchDropdown = ({ setMatchData,searchFor}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownData, setDropdownData] = useState([]);

    // Fetch the matches from the database and format them for the dropdown
    useEffect(() => {
        const fetchMatches = async () => {
            console.log(searchFor);//tempcheck
            const querySnapshot = await getDocs(collection(db, searchFor));
            const matches = querySnapshot.docs.map((doc) => doc.data());
            setDropdownData(formatOptions(matches));
            console.log(dropdownData);
        };

        fetchMatches();
    }, [searchFor]);


    const handleDropdownItemClick = (selectedOption) => {
        let matchData = transformData(selectedOption.value);
        setMatchData(matchData);
        setSearchTerm(selectedOption);
    };

    const formatOptions = (data) => {
        return data.map((item) => ({
            value: item,
            label: item.name
        }));
    };

    return (
        <div>
            
            <Select
                placeholder="Search for a tennis match..."
                value={searchTerm}
                components={{
                    NoOptionsMessage: () => (
                        <div className={styles.loader}></div>
                    ),
                }}
                onChange={handleDropdownItemClick}
                options={dropdownData}
                className={styles.searchDropdown}
            />
        </div>
    );
}

export default SearchDropdown;