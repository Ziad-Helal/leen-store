import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwQIwXJmeZoQkW1hgcftvYwlxuHxKChAI",
    authDomain: "leen-hub.firebaseapp.com",
    databaseURL: "https://leen-hub-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "leen-hub",
    storageBucket: "leen-hub.appspot.com",
    messagingSenderId: "762084342514",
    appId: "1:762084342514:web:8c13848834f7905a416e6b",
    measurementId: "G-LEHHBJKNPM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
