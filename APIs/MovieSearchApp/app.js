var express = require("express"),
    app = express(),
    request = require("request");

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search", {pageTitle: "Movie API Demo"});
});

app.get("/results", function(req, res) {
    var s = req.query.s;
    var url = "http://www.omdbapi.com/?";
    var vngr = "3n}vxrJurqo";
    var api = url + "&s=" + s + vngr.split('').map(c => String.fromCharCode(c.charCodeAt() - 13)).join('');
    
    request(api, function(error, response, body) {
       if(!error && response.statusCode == 200) {
           var data = JSON.parse(body);
           res.render("results", {pageTitle: "Movie API Demo", movies: data.Search});
       } 
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started listening...");
});