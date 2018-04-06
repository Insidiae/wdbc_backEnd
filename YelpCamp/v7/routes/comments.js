//====================
//COMMENT ROUTES
//====================
var express = require("express"),
    router = express.Router({mergeParams: true}), //passes in the :id parameter from the parent route
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

// Comment NEW route - shows a form to create a new comment
router.get("/new",
    isLoggedIn,
    function(req, res) {
        Campground.findById(req.params.id,
            function(err, foundCampground) {
                if(err) {
                    console.log(err);
                } else {
                    res.render("comments/new", {campground: foundCampground});
                }
            }
        );
    });

// Comment CREATE route - Adds a new comment associated to a single campground
router.post("/",
    isLoggedIn,
    function(req, res) {
        Campground.findById(req.params.id,
            function(err, foundCampground) {
                if(err) {
                    console.log("I AM ERROR");
                    console.log(err);
                } else {
                    Comment.create(req.body.comment,
                        function(err, addedComment) {
                            if(err) {
                                console.log("I AM ERROR");
                                console.log(err);
                            } else {
                                foundCampground.comments.push(addedComment._id);
                                foundCampground.save();
                                res.redirect("/campgrounds/" + foundCampground._id);
                            }
                        }
                    );
                }
            }
        );
    });

//Check if user is logged in. Redirect to login page if the user in not logged in.
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;