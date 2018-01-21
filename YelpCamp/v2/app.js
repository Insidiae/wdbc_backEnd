var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp");

// Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Salmon_Creek.jpg/300px-Salmon_Creek.jpg",
//         description: "Amenities at the camping park include picnic sites, trails, cabins, as well as fishing and a boat launch on 28-acre Battle Ground Lake."
        
//     }, function(err, addedCampground) {
//         if(err) {
//             console.log("I AM ERROR");
//             console.log(err);
//         } else {
//             console.log("A new campground has been added!");
//             console.log(addedCampground);
//         }
//     });

// Landing page
app.get("/", function(req, res) {
   res.render("landing");
});

// INDEX route - shows all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE route - Adds a new campground to DB
app.post("/campgrounds", function(req, res) {
    var newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
    };
    
    Campground.create(newCampground, function(err, addedCampground) {
        if(err) {
            console.log("I AM ERROR");
            console.log(err);
        } else {
            console.log("A new campground has been added!");
            console.log(addedCampground);
            res.redirect("/campgrounds");
        }
    });
});

// NEW route - shows the form to create a new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW route - displays info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server has started listening...");
});