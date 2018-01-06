var express = require("express"),
    app = express();
    //bodyParser = require("body-parser");

app.use(express.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Natasha", "Tony", "Thor", "Steve", "Bruce", "Clint"];

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends}); //An object item can have the same name as a variable
});

//POST REQUESTS IN EXPRESS
//  *app.post(route,callback) to handle post requests
//  *To be able to use the POSTed data, we need body-parser
//  *After installing/requiring body parser, type app.use(bodyParser.urlencoded({extended: true))  <- gives a deprecated warning on its own
//      -then use app.use(bodyParser.json()) to convert data into JSON format...?
//      -NOTE: Express 4.16.x now has body-parser built-in, so we just need app.use(express.urlencoded({extended: true}))
//  *Parsed data is then stored in req.body as an object

app.post("/addFriend", function(req, res) {
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect("/friends"); 
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started listening...");
});