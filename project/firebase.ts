import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0vmJ8_Tq9Geo3hFMyOO7eAbAXn4CLeio",
  authDomain: "donationproject-7ed58.firebaseapp.com",
  projectId: "donationproject-7ed58",
  storageBucket: "donationproject-7ed58.firebasestorage.app",
  messagingSenderId: "99146783941",
  appId: "1:99146783941:web:0a13b28c743444336424ac",
  measurementId: "G-3T1SV27641"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
