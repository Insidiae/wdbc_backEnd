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
                    req.flash("danger", "There was an error displaying the campgrounds.");
                    res.redirect("back");
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
        
        Campground.create(req.body.campground,
            function(err, addedCampground) {
                if(err || !addedCampground) {
                    req.flash("danger", "There was an error adding your campground. Please try again.");
                    res.redirect("back");
                } else {
                    addedCampground.author.id = req.user._id;
                    addedCampground.author.username = req.user.username;
                    addedCampground.save();
                    req.flash("success", "You have created a new campground!");
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
                if(err || !foundCampground) {
                    req.flash("danger", "Campground not found.");
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
                req.flash("info", "You have updated the info for " + updatedCampground.name + "!");
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
                req.flash("warning", "Campground has been deleted.");
                res.redirect("/campgrounds");
            }
        );
    });

module.exports = router;