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
    req.flash("danger", "You need to be logged in to do that.");
    res.redirect("/login");
};

middlewareObj.authorizeCampgroundAuthor =  function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id,
            function(err, foundCampground){
                if(err || !foundCampground) {
                    req.flash("danger", "Campground not found.");
                    res.redirect("back");
                } else {
                    if(foundCampground.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("danger", "You do not have permission to do that.");
                        res.redirect("back");
                    }
                }
            }
        );
    } else {
        req.flash("danger", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.authorizeCommentAuthor = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id,
            function(err, foundComment){
                if(err || !foundComment) {
                    req.flash("danger", "Comment not found.");
                    res.redirect("back");
                } else {
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("danger", "You do not have permission to do that.");
                        res.redirect("back");
                    }
                }
            }
        );
    } else {
        req.flash("danger", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

module.exports = middlewareObj;