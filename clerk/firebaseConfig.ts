// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiqEP3WmT0zIgdyJf_0Y053fstmqJ1lrU",
  authDomain: "cs641project-2c91a.firebaseapp.com",
  projectId: "cs641project-2c91a",
  storageBucket: "cs641project-2c91a.firebasestorage.app",
  messagingSenderId: "302170293684",
  appId: "1:302170293684:web:e27e20573e426fa5209ee1",
  measurementId: "G-SQ92EV59WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);