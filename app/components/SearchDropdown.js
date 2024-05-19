'use client'

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter, usePathname } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import SignInPage from './SignIn.js';

const SearchDropdown = ({authorization}) => {
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null); // State to keep track of the selected option
  const router = useRouter();
  const pathname = usePathname();
  const videoId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matches = querySnapshot.docs
        .filter((doc) => doc.data().published)
        .map((doc) => {
          const data = doc.data();
          return {
            value: doc.id, // Use 'value' to adhere to react-select convention
            label: data.name
          };
        });
      setDropdownData(matches);
      if(authorization){
        setIsSignedIn(true);
      }
      if(!isSignedIn) {
        router.push('/');
      }
      // Find the selected match based on the URL and set it as selected
      else if (videoId) {
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
  );
}

export default SearchDropdown;