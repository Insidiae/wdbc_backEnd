var express = require("express"),
    app = express();

var errText = "Sorry, page not found...What are you doing with your life?";

app.get("/", function(req,res){
   res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req,res){
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof woof!",
        horse: "-. . .. --. ...",
        fox: "Jacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Chacha-chacha-chacha-chow!"
    };
    var resText = "";
    if(sounds[animal]){
        resText = "The " + animal + " says '" + sounds[animal] + "'";
    } else {
        resText = errText;
    }
   res.send(resText);
});

app.get("/repeat/:message/:count", function(req,res) {
    var count = Number(req.params.count);
    var resText = "";
    for(var i = 0; i < count; i++) {
        resText += req.params.message + " ";
    }
    res.send(resText);
});

app.get("*",function(req,res) {
    res.send(errText);
});

//Start listening
app.listen(process.env.PORT,process.env.IP,function() {
    console.log("Server has started listening...");
});