// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBt1EHS2w84sCswnvOAgtJIX5LGlpLUNRo",
    authDomain: "campusqr7.firebaseapp.com",
    projectId: "campusqr7",
    storageBucket: "campusqr7.appspot.com",
    messagingSenderId: "660617201111",
    appId: "1:660617201111:web:a2b4a931e5d8972bc2b792",
    measurementId: "G-W6FMSXMRZC"
};

const app = initializeApp(firebaseConfig);

// Export Firestore database
export const db = getFirestore(app);
