'use client'

import { useEffect, useState } from 'react'
import DashboardMatch from '@/app/components/DashboardMatch.js';
import { db } from '../../services/initializeFirebase.js';
import transformData from '../../services/transformData';
//import styles from '../../styles/Dashboard.module.css';
import MatchTiles from '@/app/components/MatchTiles.js';
import extractSetScores from '@/app/services/extractSetScores.js';
import {  doc, documentId, getDoc , getDocs, collection} from 'firebase/firestore';

const groupByDate = (matches) => {
    const grouped = {};
    // Group matches into arrays by date
    matches.forEach(match => {
        const date = match.matchDate || 'unknown';
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(match);
    });

    // Convert the object into an array of arrays and sort by date descending
    return Object.entries(grouped).sort((a, b) => {
        // Convert date strings to Date objects for comparison
        // 'unknown' dates are treated as the earliest possible date
        const dateA = a[0] === 'unknown' ? new Date(0) : new Date(a[0]);
        const dateB = b[0] === 'unknown' ? new Date(0) : new Date(b[0]);
        return dateB - dateA; // Sort descending
    }).map(entry => entry[1]); // Extract only the arrays of matches
};





const tileList = () => {
    const [matchList, setMatchList] = useState([]);
    const [matchData, setMatchData] = useState();
    const [matchTemp, setMatchTemp] = useState();
    
    const matchSetScores = matchData ? extractSetScores(matchData.points) : {};
    /*
    const docId = "9y4JTHWmT62kfmNJUhfQ";

    useEffect(() => {
       // console.log("matchData:", matchData)
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
        console.log("Updated mathTemp:", matchList);  // This will log the updated state
        console.log("matchData:", matchData)
    }, [matchTemp]);  // This effect runs whenever matchList changes

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
    */


    const splitMatches = () => {

    }

    useEffect(() => {
        const fetchMatches = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, 'UCLA (W)'));
            // Iterate over each document, transform the data, and collect the results
            const transformedMatches = querySnapshot.docs.map(doc => {
                const data = doc.data(); // Get the data of each document
                return transformData(data); // Assuming transformData is a function you have that processes each document's data
            });
            const sortedDate = groupByDate(transformedMatches)
            console.log(sortedDate)
            setMatchList(sortedDate); // Update your state with the transformed matches
          } catch (error) {
            console.error('Error fetching data:', error);
          } 
        };
    
        fetchMatches();
    }, []);
      

    return (
        <div /*className={styles.matchContainer}*/>
            {matchData && (<MatchTiles  matchName={matchData.name}
                            clientTeam={matchData.clientTeam}
                            opponentTeam={matchData.opponentTeam}
                            matchDetails={matchData.matchDetails}
                            {...matchSetScores} />)}

            {matchList && matchList.map((matches, index) => (
                matches.length > 0 && (
                    <DashboardMatch key={index} matchInfo={matches} />
                )
            ))}
        </div>
    )
}

export default tileList;