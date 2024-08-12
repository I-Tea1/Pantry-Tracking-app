
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbsXVobFPUBOmG76b2RXONZrQNtrqgcb0",
  authDomain: "pantry-4a93a.firebaseapp.com",
  projectId: "pantry-4a93a",
  storageBucket: "pantry-4a93a.appspot.com",
  messagingSenderId: "915846443164",
  appId: "1:915846443164:web:c7bba06c920560b95cbd59",
  measurementId: "G-L7Z6TJERDS"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { firestore, auth };
