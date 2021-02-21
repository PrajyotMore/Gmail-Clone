import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiOIlUqIMyloNiNgHCduWojMndROqNOb0",
  authDomain: "clone-42a9b.firebaseapp.com",
  projectId: "clone-42a9b",
  storageBucket: "clone-42a9b.appspot.com",
  messagingSenderId: "778605402767",
  appId: "1:778605402767:web:243ff0adc11da2d74feefa",
  measurementId: "G-W03VLC2EM8"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);     // this statement is about firebaseConfig will connect to the backend 
  const db = firebaseApp.firestore();                          // access to database from code which is the real time database which we setup
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();



  export { db, auth, provider};