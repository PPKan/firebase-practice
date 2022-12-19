// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, getDocs,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7YgiUKHbEyiBsHbLtjiaZ8CHlN8mNesM",
  authDomain: "test-55688123.firebaseapp.com",
  projectId: "test-55688123",
  storageBucket: "test-55688123.appspot.com",
  messagingSenderId: "193525867554",
  appId: "1:193525867554:web:bfa1f75cd8beca8946167b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

