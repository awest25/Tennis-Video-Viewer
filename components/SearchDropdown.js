// components/SearchDropdown.js

import React, { useState } from 'react';

const SearchDropdown = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        // You can add logic to fetch or filter videos based on the search term.
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search for a tennis match..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
            />
            {/* Dropdown or suggestion list to show search results */}
        </div>
    );
}

export default SearchDropdown;
