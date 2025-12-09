// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgG8LatTqO6nEa-bGfpaF4VV7BL7hZgD0",
  authDomain: "ai-trip-planner-e6e6f.firebaseapp.com",
  projectId: "ai-trip-planner-e6e6f",
  storageBucket: "ai-trip-planner-e6e6f.firebasestorage.app",
  messagingSenderId: "942584900692",
  appId: "1:942584900692:web:8831395fda53d09892d1c1",
  measurementId: "G-Q2YKJMV1EH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
