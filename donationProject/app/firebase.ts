import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// app/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyD0vmJ8_Tq9Geo3hFMyOO7eAbAXn4CLeio",
  authDomain: "donationproject-7ed58.firebaseapp.com",
  projectId: "donationproject-7ed58",
  storageBucket: "donationproject-7ed58.firebasestorage.app",
  messagingSenderId: "99146783941",
  appId: "1:99146783941:web:0a13b28c743444336424ac",
  measurementId: "G-3T1SV27641"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage, firebase };

