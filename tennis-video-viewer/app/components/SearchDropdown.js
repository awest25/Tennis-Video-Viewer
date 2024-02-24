'use client'

import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';
import { useRouter, usePathname } from 'next/navigation'

const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownData, setDropdownData] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const videoId = pathname.substring(pathname.lastIndexOf('/') + 1);

  // Fetch the matches from the database and format them for the dropdown
  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDropdownData(formatOptions(matches));
    };

    fetchMatches();
  }, []);

  useEffect(() => {
    const matchName = (dropdownData.find(item => item.videoId === videoId) || {label: ''}).label;
    setSearchTerm(matchName);
  }, [videoId])

  const handleDropdownItemClick = (selectedOption) => {
    router.push('/matches/' + selectedOption.videoId);
    // setSearchTerm(selectedOption);
  };

  const formatOptions = (data) => {
    return data.map((item) => ({
      label: item.name,
      videoId: item.videoId
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