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
//      -Looks like regular HTML files...
//      -...But you can use EJS tags(<%= %>) to put JavaScript inside.
//      -Pass variables to the ejs file using res.render("fileName.ejs",{ejsVar: expressVar})
//          then ejs will now be able to use <%= ejsVar %>
// 
//  *Serving static files/folders using Express
//      -To serve your custom css/js files with Express, use express.static('pathname').
//      -app.use(express.static('pathname') lets Express serve the files contained in ./pathname/
//      -NOTE: The files in ./pathname/ seems to be added at the root (/) route.
// 
//  *A quicker/shorter way of rendering ejs files
//      -If you're only serving ejs files using res.render(), 
//       you could omit the .ejs extensions in the res.render() function by setting the view engine to ejs. 
//      -app.set("view engine", "ejs")
//
//  *EJS Partials
//      -'Member when you had to put <!DOCTYPE html>, <html>, <head>, <body>, etc on every single HTML file?
//      -There's an easier way of doing that in EJS, using Partials.
//      -To include partials in your ejs files, use <% include path/to/partialFile %>.

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
//   res.render("home.ejs");
    res.render("home");
});

app.get("/hello/:name", function(req, res) {
    var name = req.params.name;
    // res.render("hello.ejs", { Name: name }); //should now be able to use the variable Name (uppercase N) inside hello.ejs
    res.render("hello", { Name: name }); //should now be able to use the variable Name (uppercase N) inside hello.ejs
});

//  *EJS Control Flow
//      -The EJS <%= %> tag immediately places the result of the JavaScript inside it into the HTML.
//      -The EJS <% %> tag allows for JavaScript control flow without immediately placing the result into the HTML.

app.get("/guess/:guessNum", function(req, res) {
    var guessNum = Number(req.params.guessNum);
    // res.render("guess.ejs", { guess: guessNum });
    res.render("guess", { guess: guessNum });
});

app.get("/repeat/:message/:count", function(req, res) {
   var message = req.params.message,
       count = Number(req.params.count),
       obj =  { msg: message, ctr: count, hanginthere: false };
    
    //Hang in there, Sayori.
    if(message.toLowerCase() === "get out of my head.") {
        obj.msg = "Get out of my head.";
        obj.ctr = 39;
        obj.hanginthere = true;
    }
    // res.render("repeat.ejs",obj);
    res.render("repeat",obj);
});

app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Server has started listening...");
});