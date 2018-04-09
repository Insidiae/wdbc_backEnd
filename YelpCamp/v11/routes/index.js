var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//===============
// LANDING PAGE
//===============
router.get("/",
    function(req, res) {
       res.render("landing");
    });

//===============
// AUTH ROUTES
//===============

// Show register form
router.get("/register",
    function(req, res) {
        res.render("register");
    });

// Handle Signup Logic
router.post("/register",
    function(req, res) {
        var newUser = new User({username: req.body.username});
        
        User.register(newUser, req.body.password,
            function(err, user) {
                if(err) {
                    req.flash("error", err.message);
                    return res.render("register");
                }
                
                passport.authenticate("local")(req, res,
                    function() {
                        req.flash("success", "You have succesfully signed up! Welcome, " + user.username + "!");
                        res.redirect("/campgrounds");
                    }
                );
            }
        );
    });

// Show Login Form
router.get("/login",
    function(req, res) {
        res.render("login");
    });

// Handle Login Logic
router.post("/login", 
    passport.authenticate("local", {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        }), 
    function(req, res) {}
    );

// Logout route
router.get("/logout",
    function(req, res) {
        req.logout();
        req.flash("success", "You have logged out.");
        res.redirect("/campgrounds");
    });

module.exports = router;