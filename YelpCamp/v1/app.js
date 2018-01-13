var express = require("express"),
    app = express();

//Temporary Storage for Campground Data
var campgrounds = [ 
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
    {name: "Granite Hill", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
    {name: "Granite Hill", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"},
    {name: "Salmon Creek", image: "https://farm8.staticflickr.com/7259/7121858075_7375241459.jpg"},
    {name: "Granite Hill", image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg"}
];

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("landing", {pageTitle: "Welcome to YelpCamp"});
});

app.get("/campgrounds", function(req, res) {
   res.render("campgrounds", {pageTitle: "YelpCamp - Campgrounds", campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    var newCampground = {
        name: req.body.name,
        image: req.body.image
    };
    
    campgrounds.push(newCampground)
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new", {pageTitle: "Add New Campground"});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server has started listening...");
});