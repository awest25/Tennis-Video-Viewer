// import React, { useState, useEffect } from 'react';
// import Select, {components} from 'react-select';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../services/initializeFirebase.js';
// import styles from '../styles/SearchDropdown.module.css';
// import transformData from '../services/transformData.js';

// const SearchDropdown = ({ setMatchData }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [dropdownData, setDropdownData] = useState([]);

//     // Fetch the matches from the database and format them for the dropdown
//     useEffect(() => {
//         const fetchMatches = async () => {
//             const querySnapshot = await getDocs(collection(db, 'matches'));
//             const matches = querySnapshot.docs.map((doc) => doc.data());
//             setDropdownData(formatOptions(matches));
//         };

//         fetchMatches();
//     }, []);


//     const handleDropdownItemClick = (selectedOption) => {
//         let matchData = transformData(selectedOption.value);
//         setMatchData(matchData);
//         setSearchTerm(selectedOption);
//     };

//     const formatOptions = (data) => {
//         return data.map((item) => ({
//             value: item,
//             label: item.name
//         }));
//     };

//     return (
//         <div>
            
//             <Select
//                 placeholder="Search for a tennis match..."
//                 value={searchTerm}
//                 components={{
//                     NoOptionsMessage: () => (
//                         <div className={styles.loader}></div>
//                     ),
//                 }}
//                 onChange={handleDropdownItemClick}
//                 options={dropdownData}
//                 className={styles.searchDropdown}
//             />
//         </div>
//     );
// }

// export default SearchDropdown;


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
                    value: data.name,
                    label: data.name,
                    ...data
                };
            });
            setDropdownData(matches);
        };

        fetchMatches();
    }, []);

    const handleDropdownItemClick = (selectedOption) => {
        const matchNameSlug = encodeURIComponent(selectedOption.label.replace(/\s+/g, '-').toLowerCase());
        // Navigate to the match page with the selected match name
        router.push(`/matches/${matchNameSlug}`);
        // Set the match data in the parent component (matchpage.js)
        setMatchData(selectedOption);
    };

    return (
        <div>
            <Select
                placeholder="Search for a tennis match..."
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