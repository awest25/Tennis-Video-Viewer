import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';

const SearchDropdown = ({ setMatchData }) => {
    const [dropdownData, setDropdownData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id, // Set the id property to the document ID
                    label: data.name,
                    ...data
                };
            });
            setDropdownData(matches);
        };

        fetchMatches();
    }, []);

    const handleDropdownItemClick = async (selectedOption) => {
        const matchId = selectedOption.id; // Access the id property directly
        // Navigate to the match page with the selected match ID as a URL parameter
        await router.push(`/matches/${matchId}`);
        // Set the match data in the parent component (Home.js)
        setMatchData(selectedOption);
    };

    return (
        <div>
            <Select
                placeholder="Search for a tennis match..."
                onChange={handleDropdownItemClick}
                options={dropdownData}
                className={styles.searchDropdown}
            />
        </div>
    );
}

export default SearchDropdown;
