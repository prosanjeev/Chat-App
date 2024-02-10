// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK8HHvF9-I_0liXmBl_DT8V8qGed4pUgg",
  authDomain: "chat-4394c.firebaseapp.com",
  projectId: "chat-4394c",
  storageBucket: "chat-4394c.appspot.com",
  messagingSenderId: "945888055813",
  appId: "1:945888055813:web:3b8a37e31a8136159f426c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);



