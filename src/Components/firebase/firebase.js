import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 


const firebaseConfig = {
  apiKey: "AIzaSyAIUfExKvW76bGkKqgGEUxjV23YZb_TH7o",
  authDomain: "food-friends-2112.firebaseapp.com",
  projectId: "food-friends-2112",
  storageBucket: "food-friends-2112.appspot.com",
  messagingSenderId: "844894715671",
  appId: "1:844894715671:web:d45d6309da2f8675180152",
  measurementId: "G-8BNHKD3TDR"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)