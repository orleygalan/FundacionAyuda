import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDku5Zkl3m2sHoJ5eI5w0Uwfck2pUDbEGQ",
  authDomain: "fundacion-ayuda.firebaseapp.com",
  projectId: "fundacion-ayuda",
  storageBucket: "fundacion-ayuda.appspot.com",
  messagingSenderId: "470634383923",
  appId: "1:470634383923:web:16e00de5c229cbe43df146",
  measurementId: "G-ZDZ5L8XDGT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const storageRef = ref(storage);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {auth, storage, storageRef, db, analytics}