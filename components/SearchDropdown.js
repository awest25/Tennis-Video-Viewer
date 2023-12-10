// components/SearchDropdown.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import db from '../services/initializeFirebase.js';

const SearchDropdown = ({ setMatchData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);
    const [dropdownData, setDropdownData] = useState(null);

    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => doc.data());
            setDropdownData(formatOptions(matches));
            setOptions(formatOptions(matches));
        };

        fetchMatches();
    }, []);

    const handleSearchChange = (newValue) => {
        setSearchTerm(newValue);
        // You can add logic to fetch or filter videos based on the search term.
    };

    const handleDropdownItemClick = (selectedOption) => {
        setMatchData(selectedOption.value);
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
                onChange={handleDropdownItemClick}
                options={options}
                onInputChange={handleSearchChange}
                onMenuOpen={() => setOptions(dropdownData)}
                onMenuClose={() => setOptions([])}
            />
        </div>
    );
}

export default SearchDropdown;
