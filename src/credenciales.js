// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7R6QG9ei7k8yrtFThFoy9tk3_ITWEN8k",
  authDomain: "login-46e66.firebaseapp.com",
  projectId: "login-46e66",
  storageBucket: "login-46e66.appspot.com",
  messagingSenderId: "455099666617",
  appId: "1:455099666617:web:ebf6394597df2bb9bd0b68",
  measurementId: "G-4DHYK4D9KX"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
export default (appFirebase);

//usuario maria@gmail.com pass maria@gmail.com