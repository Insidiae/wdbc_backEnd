// Require external modules
var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

// Require models, seeding functions, etc.
var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/yelp_camp_v4");
//seedDB();

// Landing page
app.get("/", function(req, res) {
   res.render("landing");
});

// INDEX route - shows all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
    res.render("campgrounds/new");
});

// SHOW route - displays info about a specific campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            // console.log("Populated Campgrounds:");
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// NESTING ROUTES
//  -RESTful routes can be nested on top of another RESTful route.
//  -Very useful when associating data, such as comments to campgrounds
//  -For YelpCamp, we'll nest the comment routes (/comments) on top of the individual campground routes (/campgrounds/:id)

//====================
//COMMENT ROUTES
//====================

// Comment NEW route - shows a form to create a new comment
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

// Comment CREATE route - Adds a new comment associated to a single campground
app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log("I AM ERROR");
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, addedComment) {
                if(err) {
                    console.log("I AM ERROR");
                    console.log(err);
                } else {
                    console.log("A new comment has been added to " + foundCampground.name + "!");
                    console.log(addedComment);
                    
                    foundCampground.comments.push(addedComment._id);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server has started listening...");
});