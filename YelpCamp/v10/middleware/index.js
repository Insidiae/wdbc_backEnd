//======================
// MIDDLEWARE FUNCTIONS
//======================
var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {};

//Check if user is logged in. Redirect to login page if the user in not logged in.
middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
};

middlewareObj.authorizeCampgroundAuthor =  function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id,
            function(err, foundCampground){
                if(err) {
                    console.log(err);
                    // This redirects the user back one page.
                    res.redirect("back");
                } else {
                    //  If user is logged in, check if he/she is the author of this campground
                    //      NOTE: req.user._id (String) is NOT the same as foundCampground.author.id (ObjectId)
                    //            mongoose gives us the equals() method to compare these two values.
                    //  If user is the owner of this campground, proceed to the next function.
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    //  If user is not the author of this campground, redirect back
                    } else {
                        res.redirect("back");
                    }
                }
            }
        );
        // If user is not logged in, redirect back
    } else {
        res.redirect("back");
    }
};

middlewareObj.authorizeCommentAuthor = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id,
            function(err, foundComment){
                if(err) {
                    console.log(err);
                    res.redirect("back");
                } else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        res.redirect("back");
                    }
                }
            }
        );
    } else {
        res.redirect("back");
    }
};

module.exports = middlewareObj;