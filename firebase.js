// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDtbbUPJtq9ck5uWHUWxch5fO91kAWAYJQ",
  authDomain: "misart-admin.firebaseapp.com",
  projectId: "misart-admin",
  storageBucket: "misart-admin.firebasestorage.app",
  messagingSenderId: "126757659130",
  appId: "1:126757659130:web:cee1d1d871f5f646b7c443",
  measurementId: "G-J51LPQ9D8V"
};

const app = initializeApp(firebaseConfig);
console.log("🔥 Firebase initialized");

export const db = getFirestore(app);
export const auth = getAuth(app);
