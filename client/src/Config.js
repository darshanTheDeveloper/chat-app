// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA4zjpPc6T0a2QLTjvpDflIWdsHZwADOc",
  authDomain: "chatapp-7c855.firebaseapp.com",
  projectId: "chatapp-7c855",
  storageBucket: "chatapp-7c855.appspot.com",
  messagingSenderId: "466984855771",
  appId: "1:466984855771:web:9d1becf5a6a90a905644fe",
  measurementId: "G-R9192H61HH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage}
