'use client'

import { useEffect, useState } from 'react'
import DashboardMatch from '@/app/components/DashboardMatch.js';
import { db } from '../../services/initializeFirebase.js';
import transformData from '../../services/transformData';
import {  doc, documentId, getDoc } from 'firebase/firestore';

const tileList = () => {
const [matchList, setMatchList] = useState([]);
const [matchData, setMatchData] = useState();
const docId = "9y4JTHWmT62kfmNJUhfQ";

useEffect(() => {
    console.log("matchData:", matchData)
    const fetchData = async () => {

    try {
        // Update the matchList state
        const singles = [];
        const doubles = [];
        if(matchData)
        {
        for (let i = 0; i < 6; i++) {
            singles.push(matchData);
        }
        for (let i = 0; i < 3; i++) {
            doubles.push(matchData);
        }
        setMatchList([singles, doubles]);
        }
        
    } catch (error) {
        console.error("Error:", error);
    }

    };
    fetchData();

}, [matchData]);

useEffect(() => {
    console.log("Updated matchList:", matchList);  // This will log the updated state
}, [matchList]);  // This effect runs whenever matchList changes

useEffect(() => {
    const fetchData = async () => {
    try {
        const documentRef = doc(db, 'matches', docId);
        const documentSnapshot = await getDoc(documentRef);
        const transformedData = transformData(documentSnapshot.data());
        //console.log("transform", transformedData)
        setMatchData(transformedData)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    };

    fetchData(); // Call the fetchData function when the component mounts or when videoId changes
}, []);


return (
    
    <div>
        {matchList && (<DashboardMatch matchInfo = {matchList}/>)
        }

    </div>
)
}

export default tileList;