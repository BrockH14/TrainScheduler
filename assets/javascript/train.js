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
var TrainData = firebase.database();

//submit button function
$("#submit-btn").on("click", function(event) {
    event.preventDefault();
    // user input
    var traName = $("#trainName-input").val().trim();
    var dest = $("#dest-input").val().trim();
    var firstTra = $("#firstTrain-input").val().trim();
    var freq = $("#freq-input").val().trim();

    //push newtTrain object to the firebase database
    TrainData.ref().push({
        traName: traName,
        dest: dest,
        firstTra: firstTra,
        freq: freq
    });
    //empty out the input box text
    $("#trainName-input").val("");
    $("#dest-input").val("");
    $("#firstTrain-input").val("");
    $("#freq-input").val("");
});
//
TrainData.ref().on("child_added", function(childSnapshot){
    //pull vars from the server
    var tName = childSnapshot.val().traName;
    var tDest = childSnapshot.val().dest;
    var tfirstTra = childSnapshot.val().firstTra;
    var tFreq = childSnapshot.val().freq;

    //Math part
    var trainTime = moment(tfirstTra, "hh:mm");
    var difference =  moment().diff(moment(trainTime), "minutes");
    var trainRemain = difference % tFreq;
    var tMin = tFreq - trainRemain;
    var tArrive = moment().add(tMin, "minutes").format('hh:mm');
    

    //append new row
    var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDest),
    $("<td>").text(tFreq),
    $("<td>").text(tArrive),
    $("<td>").text(tMin),
  );
  // Append the new row to the table
  $(".table-body").append(newRow);
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

