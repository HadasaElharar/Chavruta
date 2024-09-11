import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBiWkr2ryQhXJObtX2CAQJCQibtQoP5wH4",
    authDomain: "tora-bank-project.firebaseapp.com",
    projectId: "tora-bank-project",
    storageBucket: "tora-bank-project.appspot.com",
    messagingSenderId: "646996074903",
    appId: "1:646996074903:web:a3271392ad9bdb1409e4d2"
  };
  

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  export { storage };