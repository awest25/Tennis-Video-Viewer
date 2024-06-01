'use client'

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter, usePathname } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import SignInPage from './SignIn.js';
import { AuthProvider } from './AuthWrapper.js';

const SearchDropdown = ({authorization}) => {
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to keep track of the selected option
  const router = useRouter();
  const pathname = usePathname();
  const videoId = pathname.substring(pathname.lastIndexOf('/') + 1);
  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matches = querySnapshot.docs
        .filter((doc) => doc.data().published)
        .map((doc) => {
          const data = doc.data();
          const name = data.name;
          const dateRegex = /(\d{1,2})\/(\d{1,2})\/(\d{2})/;
          const match = name.match(dateRegex);
            
          let extractedDate = null;
          if (match) {
            const month = parseInt(match[1], 10);
            const day = parseInt(match[2], 10);
            const year = parseInt(match[3], 10);

            // Assuming year 2000 is the base, adjust if needed
            const fullYear = year < 50 ? 2000 + year : 1900 + year;

            extractedDate = new Date(fullYear, month - 1, day);
          }

          return {
            value: doc.id,
            label: name,
            date: extractedDate
          };
        })
        .sort((a, b) => {
          if (!a.date || !b.date) return 1; // no date is last
          return b.date - a.date; // Sort by date
        });
      setDropdownData(matches);
      // Find the selected match based on the URL and set it as selected
      if (videoId) {
        const selectedMatch = matches.find(match => match.value === videoId);
        setSelectedOption(selectedMatch);
      }
      else{
        setSelectedOption(null);
      }
    };

    fetchMatches();
  }, [videoId]); // Depend on the matchId URL parameter

  const handleDropdownItemClick = async (option) => {
    setSelectedOption(option); // Update the selected option state
    await router.push('/matches/' + option.value);
  };

  return (
    <AuthProvider>
    <div>
      <Select
        placeholder="Search for a tennis match..."
        onChange={handleDropdownItemClick}
        value={selectedOption} // Set the selected option based on the URL
        options={dropdownData}
        components={{
          NoOptionsMessage: () => (
            <div className={styles.loader}></div>
          ),
        }}
        className={styles.searchDropdown}
      />
    </div>
    </AuthProvider>
  );
}

export default SearchDropdown;