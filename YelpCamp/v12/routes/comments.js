//====================
//COMMENT ROUTES
//====================
var express = require("express"),
    router = express.Router({mergeParams: true}), //passes in the :id parameter from the parent route
    middleware = require("../middleware"),
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

// Comment NEW route - shows a form to create a new comment
router.get("/new",
    middleware.isLoggedIn,
    function(req, res) {
        Campground.findById(req.params.id,
            function(err, foundCampground) {
                if(err || !foundCampground) {
                    req.flash("danger", "Cannot find that campground.");
                    res.redirect("back");
                } else {
                    res.render("comments/new", {campground: foundCampground});
                }
            }
        );
    });

// Comment CREATE route - Adds a new comment associated to a single campground
router.post("/",
    middleware.isLoggedIn,
    function(req, res) {
        Campground.findById(req.params.id,
            function(err, foundCampground) {
                if(err || !foundCampground) {
                    req.flash("danger", "Cannot find that campground.");
                    res.redirect("back");
                } else {
                    Comment.create(req.body.comment,
                        function(err, addedComment) {
                            if(err || !addedComment) {
                                req.flash("danger", "There was an error in adding your comment. Please try again.");
                                res.redirect("back");
                            } else {
                                addedComment.author.id = req.user._id;
                                addedComment.author.username = req.user.username;
                                addedComment.save();
                                foundCampground.comments.push(addedComment._id);
                                foundCampground.save();
                                req.flash("success", "You have posted a comment on " + foundCampground.name + ".");
                                res.redirect("/campgrounds/" + foundCampground._id);
                            }
                        }
                    );
                }
            }
        );
    });

// Comment EDIT route - Shows a form to edit an existing comment
router.get("/:comment_id/edit",
    middleware.authorizeCommentAuthor,
    function(req, res) {
        Comment.findById(req.params.comment_id)
            .then(function(foundComment) {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        );
    });

// Comment UPDATE route - Modifies an existing comment
router.put("/:comment_id",
    middleware.authorizeCommentAuthor,
    function(req, res) {
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
            .then(function() {
                req.flash("info", "You have updated your comment.");
                res.redirect("/campgrounds/" + req.params.id);
            }
        );
    });

// Comment DESTROY route - Deletes an existing comment
router.delete("/:comment_id",
    middleware.authorizeCommentAuthor,
    function(req, res) {
        Comment.findByIdAndRemove(req.params.comment_id)
            .then(function() {
                req.flash("warning", "You have deleted your comment.");
                res.redirect("/campgrounds/" + req.params.id);
            }
        );
    });

module.exports = router;