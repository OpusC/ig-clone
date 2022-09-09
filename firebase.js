import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAcPZQiFmcAm3xNjBEGYMNFQbyBBbc1bDw",
  authDomain: "rn-ig-clone-36071.firebaseapp.com",
  projectId: "rn-ig-clone-36071",
  storageBucket: "rn-ig-clone-36071.appspot.com",
  messagingSenderId: "535762368568",
  appId: "1:535762368568:web:c4e0f921899027402e0ecd"
};


const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export const db = getFirestore(app)
