//====================
// CAMPGROUNDS ROUTES
//====================
var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

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
    middleware.isLoggedIn,
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
                    res.redirect("back");
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
    middleware.isLoggedIn,
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
                    res.redirect("back");
                } else {
                    res.render("campgrounds/show", {campground: foundCampground});
                }
            });
    });


// EDIT route - Shows the form to edit an existing campground
router.get("/:id/edit",
    middleware.authorizeCampgroundAuthor,
    function(req, res) {
        Campground.findById(req.params.id)
            .then(function(foundCampground) {
                res.render("campgrounds/edit", {campground: foundCampground});
            }
        );
    });

// UPDATE route - Modifies an existing campground
//  method-override: POST /campgrounds/:id?_method=PUT
router.put("/:id",
    middleware.authorizeCampgroundAuthor,
    function(req, res) {
        Campground.findByIdAndUpdate(req.params.id, req.body.campground)
            .then(function(updatedCampground) {
                res.redirect("/campgrounds/" + req.params.id);
            }
        );
    });

// DESTROY route - Deletes an existing campground
//  method-override: POST /campgrounds/:id?_method=DELETE
router.delete("/:id",
    middleware.authorizeCampgroundAuthor,
    function(req, res){
        Campground.findByIdAndRemove(req.params.id)
            .then(function() {
                res.redirect("/campgrounds");
            }
        );
    });

module.exports = router;