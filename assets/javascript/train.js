//connect to firebase 
//initial train data 
//create add train button with functionality 
//retreive saved trains 
//calculate the times 

//Firebase link
var Config = {
    apiKey: "AIzaSyD-yLzclO7OhzFvnjaqHFdjNUUWtMpIrug",
    authDomain: "trainscheduler-b8efc.firebaseapp.com",
    databaseURL: "https://trainscheduler-b8efc.firebaseio.com",
    projectId: "trainscheduler-b8efc",
    storageBucket: "trainscheduler-b8efc.appspot.com",
};

firebase.initializeApp(Config)

// variable to reference the database
var database = firebase.database();