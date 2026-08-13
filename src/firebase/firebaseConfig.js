import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDhuroimBX6nNWwCqsKK5nCT0tSPzG0qc",
  authDomain: "maternaguard-46849.firebaseapp.com",
  databaseURL: "https://maternaguard-46849-default-rtdb.firebaseio.com",
  projectId: "maternaguard-46849",
  storageBucket: "maternaguard-46849.firebasestorage.app",
  messagingSenderId: "921976544582",
  appId: "1:921976544582:web:167935371714f488ab9947"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);