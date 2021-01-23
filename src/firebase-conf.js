// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firebase-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCwmz3t5f80PrxL4SIysubM4vRlOMwYW-k",
    authDomain: "arabic-for-kids-e4d6b.firebaseapp.com",
    projectId: "arabic-for-kids-e4d6b",
    storageBucket: "arabic-for-kids-e4d6b.appspot.com",
    messagingSenderId: "686087442433",
    appId: "1:686087442433:web:bad3a7f2104aa40f643000",
    measurementId: "G-XPL6STW4QJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
var audioRef = storageRef.child('audio');

export default audioRef;