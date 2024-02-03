import { collection, query, where, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js

async function saveTaggingData(videoId, newTimes, delTimes) {
    if (!videoId || !newTimes) {
      console.error("All fields are required.");
      return; // Exit the function if any field is empty
    }
  
    try {
      // Save data in tag-match.js to Firestore
      const querySnapshot = await getDocs(query(collection(db, "tag-match"), where("videoId", "==", videoId)));
      if (!querySnapshot.empty) {
        alert("Doc with same videoID exists! Try loading in old data or updating!");
        const confirmed = window.confirm("Update data?")
        if (confirmed) {
          const docRef = querySnapshot.docs[0].ref;

          const dbPoints = querySnapshot.docs[0].data().points;
          // timeJson overwrites duplicate keys: handles concurrent modification off of old doc
          // when saving ==> fetch latest doc (points JSON)
          // merge! these changes with local changes and write to Firebase; changes of the same timestamp will prioritize local
          // HOWEVER, merging never deletes data... How can we save concurrent data at the same time while letting us remove data?
          const merged = [...dbPoints, ...newTimes];

          // console.log(merged);
          // console.log(delTimes)
          const fin = merged.filter(
            item1 => !delTimes.some(item2 => item1.start === item2.start && item1.end === item2.end)
            );

          // console.log(fin)
          await updateDoc(docRef, {
            points: fin
          });
          console.log("Document overwritten with ID: ", docRef.id);
        }
        // reload potentially stale data (concurrent changes)
        // loadTaggingData(videoId)
        return;
      }
      const docRef = await addDoc(collection(db, "tag-match"), {
        videoId: videoId,
        points: newTimes,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

async function loadTaggingData(videoId) {
  if (!videoId) {
    alert("Please input a video ID");
    return;
  }

  try {
    const querySnapshot = await getDocs(query(collection(db, "tag-match"), where("videoId", "==", videoId)));
    if (querySnapshot.empty) {
      alert("Previous data does not exist; time to start working :(")
      return [];
    }
    console.log("Document fetched with ID: ", querySnapshot.docs[0].id);

    const pointsArray = [];
    querySnapshot.forEach((doc) => {
        const points = doc.data().points;
        pointsArray.push(points);
    });
    return pointsArray[0];
  } catch (e) {
    console.error("Error loading: ", e);
  }
}

  
export { saveTaggingData, loadTaggingData };