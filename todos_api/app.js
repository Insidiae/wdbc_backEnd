var express = require("express"),
    app = express();

var todoRoutes = require("./routes/todos");

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Todos API is up and running!");
});