//====================
// CAMPGROUNDS ROUTES
//====================
var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground");

// INDEX route - shows all campgrounds
router.get("/",
    function(req, res) {
        Campground.find({},
            function(err, allCampgrounds) {
                if(err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                } else {
                    res.render("campgrounds/index", {campgrounds: allCampgrounds});
                }
            }
        );
    });

// CREATE route - Adds a new campground to DB
router.post("/",
    isLoggedIn,
    function(req, res) {
        var author = {
          id: req.user._id,
          username: req.user.username
        };
        var newCampground = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            author: author
        };
        
        Campground.create(newCampground,
            function(err, addedCampground) {
                if(err) {
                    console.log("I AM ERROR");
                    console.log(err);
                } else {
                    // console.log("A new campground has been added!");
                    // console.log(addedCampground);
                    res.redirect("/campgrounds");
                }
            }
        );
    });

// NEW route - shows the form to create a new campground
router.get("/new",
    isLoggedIn,
    function(req, res) {
        res.render("campgrounds/new");
    });

// SHOW route - displays info about a specific campground
router.get("/:id",
    function(req, res) {
        Campground.findById(req.params.id)
          .populate("comments")
          .exec(function(err, foundCampground) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("campgrounds/show", {campground: foundCampground});
                }
            });
    });

//Check if user is logged in. Redirect to login page if the user in not logged in.
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;