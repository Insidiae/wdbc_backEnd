var express = require("express"),
    app = express();

var todoRoutes = require("./routes/todos");

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.send("HELLO FROM THE ROOT ROUTE");
});

app.use("/api/todos", todoRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Todos API is up and running!");
});