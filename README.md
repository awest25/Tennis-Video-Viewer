# Tennis-Video-Viewer
A web app focused on tennis match playback integrating with point-level data, supporting filtering the match by point attributes.

# Getting Started
1. Clone the repo
2. Run `npm install` to install dependencies
3. Run `npm run dev` to run the test server
4. Navigate to `localhost:3000` in your browser

# Development Notes
A firestore database was created. A web app was linked in Project Settings -> Apps -> Web App. The config object was copied into the firebaseInit file.

Before uploading a CSV, it must be converted to JSON. Use csvjson.com.

## Deployment

1. Run `npm run build` to generate production files
2. Run `firebase deploy` to depoly to firebase

## Using Applicating

1. Press Upload Match
2. Use Embed link cutting off after "?"
Example: https://www.youtube.com/embed/pZ004Pn8pFY?si=RMyyQwShIUxqHLhq (already taken from embed link) would be cut to https://www.youtube.com/embed/pZ004Pn8pFY
