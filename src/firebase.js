import * as firebase from 'firebase';
let firebaseConfig = {
    apiKey: "AIzaSyADMDtczUN4mRNlYsZB68auRUh8eE5gHhU",
    authDomain: "organa-7b8ec.firebaseapp.com",
    databaseURL: "https://organa-7b8ec.firebaseio.com",
    projectId: "organa-7b8ec",
    storageBucket: "organa-7b8ec.appspot.com",
    messagingSenderId: "222593244139",
    appId: "1:222593244139:web:0ba4d84e71b02c50"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;