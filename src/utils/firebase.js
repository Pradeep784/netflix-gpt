// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhip1MXvcSRQlCSZnUr-gHaaKqCs18MLE",
  authDomain: "netflixgpt-a1831.firebaseapp.com",
  projectId: "netflixgpt-a1831",
  storageBucket: "netflixgpt-a1831.appspot.com",
  messagingSenderId: "197739720793",
  appId: "1:197739720793:web:2ae2927d78e1dfa6380148",
  measurementId: "G-MJ605NK016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
