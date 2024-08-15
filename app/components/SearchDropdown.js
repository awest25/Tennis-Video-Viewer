'use client'

import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useRouter, usePathname } from 'next/navigation';
import { useMatchData } from './MatchDataProvider'; // Assuming the hook is located in the context folder
import styles from '../styles/SearchDropdown.module.css';
import { useAuth } from './AuthWrapper.js';

const extractDateFromName = (name) => {
  const dateRegex = /(\d{1,2})\/(\d{1,2})\/(\d{2})/;
  const matchResult = name.match(dateRegex);

  if (!matchResult) return null;

  const [month, day, year] = matchResult.slice(1).map(Number);
  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  return new Date(fullYear, month - 1, day);
};

const formatMatches = (matches) =>
  matches
    .map((match) => ({
      value: match.id,
      label: match.name,
      date: extractDateFromName(match.name),
    }))
    .sort((a, b) => (b.date && a.date ? b.date - a.date : 1)); // Sort by date descending

const SearchDropdown = ({ authorization }) => {
  const { matches, error } = useMatchData(); // Using the custom hook to access match data
  const [dropdownData, setDropdownData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const videoId = pathname.split('/').pop();

  useEffect(() => {
    if (matches?.length) {
      const sortedMatches = formatMatches(matches);
      setDropdownData(sortedMatches);

      const selectedMatch = sortedMatches.find((match) => match.value === videoId);
      setSelectedOption(selectedMatch || null);
    }
  }, [matches, videoId]);

  const handleDropdownItemClick = (option) => {
    setSelectedOption(option);
    router.push(`/matches/${option.value}`);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Select
        placeholder="Search for a tennis match..."
        onChange={handleDropdownItemClick}
        value={selectedOption}
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
};

export default SearchDropdown;
