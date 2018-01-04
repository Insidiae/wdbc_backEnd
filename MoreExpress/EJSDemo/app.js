//Shorthand: var app = require("express")(); 
var express = require("express"),
    app = express();


//Dynamic web apps should have dynamic html
//  *You can create dynamic html files using templates
//
//Serve dynamic HTML using Express
//  *EJS => Embedded JavaScript
//      -aka the template we'll be using
//
//  *res.render("fileName.ejs");
//      -will look for fileName.ejs inside ./views/
//      -you need a separate module (ejs) to actually render EJS using Express
//
//  *Inside EJS Files
//      -Looks like regular html files...
//      -...But you can use "<%= %>" to put javascript inside.
//      -Pass variables to the ejs file using res.render("fileName.ejs",{ejsVar: expressVar})
//          then ejs will now be able to use <%= ejsVar %>
app.get("/", function(req,res){
   res.render("home.ejs");
});

app.get("/hello/:name", function(req,res) {
    var name = req.params.name;
    res.render("hello.ejs", {Name: name}); //should now be able to use the variable Name (uppercase N) inside hello.ejs
});

app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Server has started listening...");
});