// components/SearchDropdown.js

import React, { useState } from 'react';
import Select from 'react-select';

const SearchDropdown = ({ setPointsData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState([]);

    const handleSearchChange = (newValue) => {
        setSearchTerm(newValue);
        // You can add logic to fetch or filter videos based on the search term.
    };

    const handleDropdownItemClick = (selectedOption) => {
        setPointsData(selectedOption.value);
    };

    const formatOptions = (data) => {
        return data.map((item) => ({
            value: item,
            label: item
        }));
    };

    return (
        <div>
            <Select
                placeholder="Search for a tennis match..."
                value={searchTerm}
                onChange={handleSearchChange}
                options={options}
                onInputChange={handleSearchChange}
                onMenuOpen={() => setOptions(formatOptions(['Points Data 1', 'Points Data 2', 'Points Data 3']))}
                onMenuClose={() => setOptions([])}
            />
        </div>
    );
}

export default SearchDropdown;
