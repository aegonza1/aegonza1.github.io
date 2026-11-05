
import { initializeApp } from
"https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";

import { getFirestore } from
"https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAY-PNn6h029mm1tGdisd9-nfrDTlSP79o",
    authDomain: "webprogramming-ab2d5.firebaseapp.com",
    projectId: "webprogramming-ab2d5",
    storageBucket: "webprogramming-ab2d5.firebasestorage.app",
    messagingSenderId: "298343707366",
    appId: "1:298343707366:web:4a35ff6b36af23829b4127"
};

const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

