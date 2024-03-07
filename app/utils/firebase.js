import firebase from "firebase/compat/app";
//Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASWJgEJuAPDxDYxARtwGgWa1WMbPOFQTc",
    authDomain: "utm221026ti.firebaseapp.com",
    projectId: "utm221026ti",
    storageBucket: "utm221026ti.appspot.com",
    messagingSenderId: "771764700957",
    appId: "1:771764700957:web:b66a3fa4f1096294fe43f4"
  };

  //Iniciatilize Firebase

  export const firebaseApp= firebase.initializeApp(firebaseConfig);