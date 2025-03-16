// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIRBASE_API_KEY,
  authDomain: "task-manager-83e19.firebaseapp.com",
  projectId: "task-manager-83e19",
  storageBucket: "task-manager-83e19.firebasestorage.app",
  messagingSenderId: "117390136569",
  appId: "1:117390136569:web:a4ef22126ff37180fbbe28",
  measurementId: "G-83KFSTLLJG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);