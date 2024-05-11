
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXV35PJ42ATVoWWWxZhRj8YV7-hdHXIE4",
  authDomain: "test-5a9ba.firebaseapp.com",
  projectId: "test-5a9ba",
  storageBucket: "test-5a9ba.appspot.com",
  messagingSenderId: "205352357974",
  appId: "1:205352357974:web:1fee32aa67c8642937ebf7",
  measurementId: "G-NJ0P9JTCY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB= getFirestore(app);
const storage= getStorage(app);

export {fireDB, storage};