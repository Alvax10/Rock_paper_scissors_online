import firebase from "firebase";

const app = firebase.initializeApp({
    apiKey: "mKsEaIjDWkxlBBrsCZoFVbZtQsnLzCYYKWHu2I5x",
    dataBaseURL: "https://apx-dwf-m6-c5c23-default-rtdb.firebaseio.com/",
    authDomain: "apx-dwf-m6.firebaseapp.com",
    projectId: "apx-dwf-m6-c5c23",
});

const rtdb = firebase.database();

export { rtdb };