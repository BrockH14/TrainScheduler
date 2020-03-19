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
    //Determine the arrival of the next train

    
});
//
TrainData.ref().on("child_added", function(childSnapshot){

    var tName = childSnapshot.val().traName;
    var tDest = childSnapshot.val().dest;
    // var tfirstTra = childSnapshot.val().firstTra;
    var tFreq = childSnapshot.val().freq;
    // var ArrTime = tfirstTra.split("00:00");
    // var traTime = moment().hours(ArrTime[0]).minutes(ArrTime[1]);
    // var maxMoment = moment.max(moment(), ArrTime);
    // var tMin;
    // var tArrive;



//   if (maxMoment === traTime) {
//     tArrive = traTime.format("HH:mm");
//     tMin = traTime.diff(moment(), "minutes");
//   } else {
//     var differenceTimes = moment().diff(traTime, "minutes");
//     var tRemainder = differenceTimes % tFreq;
//     tMin = tFreq - tRemainder;
//     tArrive = moment().add(tMin, "m").format("HH:mm");
//   }
  
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDest),
    $("<td>").text(tFreq),
    // $("<td>").text(tArrive),
    // $("<td>").text(tMin),
  );
  // Append the new row to the table
  $(".table-body").append(newRow);


}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});