// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzgG4_rFvEdb1LfSqIsei12-OfMwzykNc",
    authDomain: "myapp-5c347.firebaseapp.com",
    projectId: "myapp-5c347",
    storageBucket: "myapp-5c347.appspot.com",
    messagingSenderId: "621052435064",
    appId: "1:621052435064:web:3f612a8f8f3a9d27fe6b8d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
