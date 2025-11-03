import app from "firebase/app"
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAsnaCna7XM324XdSp2wb7kDeMULe4rSm4",
  authDomain: "grupo5-prog1-com3-pi2.firebaseapp.com",
  projectId: "grupo5-prog1-com3-pi2",
  storageBucket: "grupo5-prog1-com3-pi2.firebasestorage.app",
  messagingSenderId: "587163588815",
  appId: "1:587163588815:web:9dc11ab51ae9afefbebfba"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = app.firestore();
