import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';

const SearchDropdown = ({ setMatchData }) => {
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // State to keep track of the selected option
    const router = useRouter();

    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    value: doc.id, // Use 'value' to adhere to react-select convention
                    label: data.name,
                    ...data
                };
            });
            setDropdownData(matches);
            
            // Find the selected match based on the URL and set it as selected
            const matchIdFromURL = router.query.matchId; // This should match the URL query parameter name for match ID
            if (matchIdFromURL) {
                const selectedMatch = matches.find(match => match.value === matchIdFromURL);
                setSelectedOption(selectedMatch);
            }
        };

        fetchMatches();
    }, [router.query.matchId]); // Depend on the matchId URL parameter

    // ... (other code remains unchanged)

    const handleDropdownItemClick = async (option) => {
        setSelectedOption(option); // Update the selected option state
        const matchId = option.value; // Access the value property directly
        await router.push(`/matches/${matchId}`);
        setMatchData(option);
    };

    return (
        <div>
            <Select
                placeholder="Search for a tennis match..."
                onChange={handleDropdownItemClick}
                value={selectedOption} // Set the selected option based on the URL
                options={dropdownData}
                className={styles.searchDropdown}
            />
        </div>
    );
}

export default SearchDropdown;
