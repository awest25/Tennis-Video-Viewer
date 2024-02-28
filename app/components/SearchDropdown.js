'use client'

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useRouter, usePathname } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/initializeFirebase.js';
import styles from '../styles/SearchDropdown.module.css';

const SearchDropdown = () => {
    const [dropdownData, setDropdownData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null); // State to keep track of the selected option

    const router = useRouter();
    const pathname = usePathname();
    const videoId = pathname.substring(pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        const fetchMatches = async () => {
            const querySnapshot = await getDocs(collection(db, 'matches'));
            const matches = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                console.log(data)
                return {
                    value: data.videoId, // Use 'value' to adhere to react-select convention
                    label: data.name,
                    ...data
                };
            });
            setDropdownData(matches);
            
            // Find the selected match based on the URL and set it as selected
            if (videoId) {
                const selectedMatch = matches.find(match => match.value === videoId);
                setSelectedOption(selectedMatch);
            }
        };

        fetchMatches();
    }, [videoId]); // Depend on the matchId URL parameter

    // ... (other code remains unchanged)

    const handleDropdownItemClick = async (option) => {
        setSelectedOption(option); // Update the selected option state
        const matchId = option.value; // Access the value property directly
        // await router.push(`/matches/${matchId}`);
        await router.push('/matches/' + option.value);
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


/**
 * version 2: using URL to parse videoId
 * TODO: update this so react-select isn't highlighting everything blue
 
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
      // const matches = querySnapshot.docs.map(doc => ({ 
      //   label: doc.name,
      //   value: doc.id,
      //   doc.data() }));
      const matches = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            value: doc.videoId, // Use 'value' to adhere to react-select convention
            label: data.name,
            ...data
        };
      });
      // use formatOptions
      setDropdownData(matches);
    };

    fetchMatches();

    // const matchName = (dropdownData.find(item => item.videoId === videoId) || {label: ''}).label;
    // setSearchTerm(matchName);
  }, []);

  // useEffect(() => {
  //   const matchName = (dropdownData.find(item => item.videoId === videoId) || {label: ''}).label;
  //   setSearchTerm(matchName);
  // }, [videoId])

  const handleDropdownItemClick = (selectedOption) => {
    router.push('/matches/' + selectedOption.videoId);
    console.log(selectedOption)
    setSearchTerm(selectedOption.value);
  };

  const formatOptions = (data) => {
    return data.map((item) => ({
      label: item.name,
      value: item.id,
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

 */