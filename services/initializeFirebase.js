import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*
multiple ways to confuigure dev vs prod
1. (best imo) add test property to matches and automitically filter
  - doesn't need to be that clear of a separation between test-matches and matches; just delete afterwards
  - Firebase endpoint is only accessed on home page (SearchDropdown) and potentially tag-match page
    - easy to filter: small-scale project
  - no need to manually change the .env code every time
    - less user errors
2. new Firebase collection with mathes
  - (X) firebase serve: local firebase configs
  - (tentative X) firebase alias: firebase version env vars, just an alias for project-id
    - must switch on CLI: firebase use dev; firebase use staging, etc
    - deployment: uses currently selected project (conflicts with GitHub Actions auto-deploy; better for large-scale projects)
  - (X) initializeApp(config, 'secondary'): multiple databases db1, db2, etc
    - suitable for different db, not dev/prod because DB endpoints
  - (would work) .env vars: apiKey: process.env.FIREBASE_API_KEY,
    - need to change .env var and npm run dev
    - look into Firebase .env support (set auto true/false during production)
*/

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOvEiiwKE_Q_aTWdyOpTIDmYmbPHA9KOg",
  authDomain: "match-viewing-dashboard.firebaseapp.com",
  projectId: "match-viewing-dashboard",
  storageBucket: "match-viewing-dashboard.appspot.com",
  messagingSenderId: "276222404565",
  appId: "1:276222404565:web:d295bf29156c4bb4a73f5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore service
const db = getFirestore(app);

// Get the Firebase Storage service
const storage = getStorage(app);

/*
// secondary
const secondaryAppConfig = {
  // credential: cert(secondaryServiceAccount),
  databaseURL: 'https://match-viewing-dashboard.firebaseio.com'
};
const secondary = initializeApp(secondaryAppConfig, 'secondary');
const secondaryDb = getFirestore(secondary);
const secondaryStorage = getStorage(secondary);
*/

export { db, storage }; // Export both Firestore and Storage