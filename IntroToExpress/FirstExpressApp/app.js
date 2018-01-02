var express = require("express"),
    app = express();

//OBJECTIVES
//  *Define routes
//      route => displayed message
//      "/" => "Hi there!"
//      "/bye" => "Goodbye!"
//      "/cat" => "WOOF."
//      "*" ("Splat/Star" route, basically a catch-all route I guess) => "YOU ARE A STAR!!!"
//      NOTE: Order of routes matters; First route that matches a given request is the ONLY route that will be accessed/run.

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

//  *Route Parameters
//      Provides a "pattern" for matching the pages contained in a given route
//      Just put ":" before a route "subfolder/page" to make it a variable
//      Route parameters are stored in req.params
//      Example: Subreddits/comments
//          /r/:subredditName => matches every single subreddit
//              req.params contains: { subredditName: <subredditName> }
//          /r/:subredditName/comments/:id/:title => matches every single post inside a given subreddit
//              req.params contains: { subredditName: <subredditName>, id: <id>, title: <title> }

//Sample Route Parameter Code
app.get("/meme/:anything",function(req,res){
   res.send("Welcome to the " + req.params.anything.toLowerCase() + " meme page!");
});

//Code for Splat route
app.get("*",function(req,res) {
    res.send("YOU ARE A STAR!!!");
});

//Start listening
app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Server has started listening...");
});