// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVq1iIrZLjBb6AB4XTQ67Rlg6HOD8cQKE",
  authDomain: "valvitek-674f9.firebaseapp.com",
  projectId: "valvitek-674f9",
  storageBucket: "valvitek-674f9.appspot.com",
  messagingSenderId: "336233519001",
  appId: "1:336233519001:web:bfde39fe82a671dde96508",
  measurementId: "G-FZY06VKB9F"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export default firebaseApp