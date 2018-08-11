// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Reservations (DATA)
// =============================================================

// !!!!!THIS IS WHERE THE APP TAKES IN USER INPUT FROM BROWSER TO MYSQL DATABASE!!!!! 
//var name = $("#name_input").val().trim();
//var phone = $("#phone_input").val().trim();
//var email = $("#email_input").val().trim();
//var initials = $("#id_input").val().trim();

// THEN I GUESS WE SET THE VARS ABOVE TO THE MYSQL KEYS?

// THE FOLLOWING HERE WORKS, SO TECHNICALLY WE CAN PLUG THE VARS FROM ABOVE AND THEY WILL RENDER
var reservations = [
  {
    Name: "name",
    Phone: "phone",
    Email: "email",
    ID: "uniqueID"
  }
];

var waitlist = [
    {
      Name: "name",
      Phone: "phone",
      Email: "email",
      ID: "uniqueID"
    }
];
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "/tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "/reserve.html"));
});

// Displays tables
app.get("/api/tables", function(req, res) {
  return res.json(reservations);
});

// Displays waitlist
app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Create New Reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservations = req.body;

  // Using a RegEx Pattern to remove spaces from newReservation
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservations.routeName = newReservations.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservations);

  reservations.push(newReservations);

  res.json(newReservations);
});

// Create New Waitlist - takes in JSON input
app.post("/api/waitlist", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newWaitlist = req.body;
  
    // Using a RegEx Pattern to remove spaces from newReservation
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newWaitlist);
  
    waitlist.push(newWaitlist);
  
    res.json(newWaitlist);
  });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});