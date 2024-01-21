import React, { useState, useEffect } from 'react';
import Select, {components} from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import transformData from '../services/transformData.js';

const SearchDropdown = ({ setMatchData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownData, setDropdownData] = useState([]);

    // Fetch the matches from the database and format them for the dropdown
    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => doc.data());
            setDropdownData(formatOptions(matches));
        };

        fetchMatches();
    }, []);


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
                components={{NoOptionsMessage}}
                styles={{ noOptionsMessage: (base) => ({ ...base}) }}
                onChange={handleDropdownItemClick}
                options={dropdownData}
                className={styles.searchDropdown}
            />
        </div>
    );
}

const NoOptionsMessage = (props)=>{
    return(
        <components.NoOptionsMessage {...props}>
            <div className={styles.loader}></div>
        </components.NoOptionsMessage>
    )
}

export default SearchDropdown;