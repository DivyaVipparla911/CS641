import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';  // Use correct imports
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth and set persistence using AsyncStorage
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)  // Optional: Use persistence for local storage
  .catch((error) => console.log(error));  // Error handling if persistence setup fails

// Initialize Storage
const storage = getStorage(app);

export { db, auth, storage };
