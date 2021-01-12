import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDKywOLq8yuozmOXjtOUIR7yUXBekDoN3A",
  authDomain: "lizzigram-1600291187801.firebaseapp.com",
  databaseURL: "https://lizzigram-1600291187801.firebaseio.com",
  projectId: "lizzigram-1600291187801",
  storageBucket: "lizzigram-1600291187801.appspot.com",
  messagingSenderId: "944169679344",
  appId: "1:944169679344:web:d376029997bd7351b04535",
  measurementId: "G-C9Q921F1E6",
};

const Auth = () => {
  useEffect(() => {
    if (firebase.apps && !firebase.apps.length)
      firebase.initializeApp(firebaseConfig);
  });

  return <p>Auth component.</p>;
};

export default Auth;
