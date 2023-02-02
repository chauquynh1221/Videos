import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBBVnCQGdjby0qNPfA4OpvMiraaqYh64Xw",
  authDomain: "chautube-68b0e.firebaseapp.com",
  projectId: "chautube-68b0e",
  storageBucket: "chautube-68b0e.appspot.com",
  messagingSenderId: "657100641770",
  appId: "1:657100641770:web:8608d4a414aeafa1c94e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;


