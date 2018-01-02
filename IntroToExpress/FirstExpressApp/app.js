var express = require("express"),
    app = express();

//OBJECTIVES
//  *Define routes
//      route => displayed message
//      "/" => "Hi there!"
//      "/bye" => "Goodbye!"
//      "/cat" => "WOOF."

//  *Express functions
//      app.get(options,callback)
//          where options => path/URL
//                callback(req,res) => code to run when a GET request is sent to this path/route
//                  req => Object, contains info about the request
//                  res => Object, contains info about what this route is supposed to send back
//
//      app.listen(port,hostname,callback)
//          where port => port to listen to
//                  NOTE: On cloud9, we have to use process.env.PORT as the port to get the correct number from Cloud9's servers
//                hostname => hostname/IP address to listen to (In cloud9 we use process.env.IP)
//                callback() => Code to run when listening starts

//Code for route "/"
app.get("/",function(req,res) {
    res.send("Hi there!"); 
});

//Code for route "/bye"
app.get("/bye",function(req,res) {
    res.send("Goodbye!"); 
});

//Code for route "/cat"
app.get("/cat",function(req,res) {
    console.log("GET Request was made to /cat"); //message should appear in the terminal
    res.send("WOOF."); 
});

//Start listening
app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Server has started listening...");
});