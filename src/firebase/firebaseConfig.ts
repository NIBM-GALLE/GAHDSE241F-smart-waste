// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBVRhl5af7yx04_MtYuN5ejYgSjbLwDdVU",
  authDomain: "smart-waste-management-3041a.firebaseapp.com",
  projectId: "smart-waste-management-3041a",
  storageBucket: "smart-waste-management-3041a.firebasestorage.app",
  messagingSenderId: "378788627505",
  appId: "1:378788627505:web:bc05cb057b77fc74e50110",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
