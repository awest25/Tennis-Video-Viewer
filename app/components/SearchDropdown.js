'use client'

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter, usePathname } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import { AuthProvider, useAuth } from './AuthWrapper.js';

const SearchDropdown = ({ authorization }) => {
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to keep track of the selected option
  const router = useRouter();
  const pathname = usePathname();
  const videoId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const { authUser, userProfile, handleSignOut } = useAuth();
  
  useEffect(() => {
    const fetchMatches = async () => {
      if (userProfile && userProfile.collections) {
        const matches = [];

        for (const col of userProfile.collections) {
          const colRef = collection(db, col);
          const q = query(colRef, where('published', '==', true));
          const querySnapshot = await getDocs(q);

          querySnapshot.docs.forEach((doc) => {
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

            matches.push({
              value: doc.id,
              label: name,
              date: extractedDate,
            });
          });
        }

        const sortedMatches = matches.sort((a, b) => {
          if (!a.date || !b.date) return 1; // no date is last
          return b.date - a.date; // Sort by date
        });

        setDropdownData(sortedMatches);

        // Find the selected match based on the URL and set it as selected
        if (videoId) {
          const selectedMatch = sortedMatches.find((match) => match.value === videoId);
          setSelectedOption(selectedMatch);
        } else {
          setSelectedOption(null);
        }
      }
    };

    fetchMatches();
  }, [videoId, userProfile]);

  const handleDropdownItemClick = async (option) => {
    setSelectedOption(option); // Update the selected option state
    router.push('/matches/' + option.value);
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
