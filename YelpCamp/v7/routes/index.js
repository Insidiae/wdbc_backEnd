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
                    console.log(err);
                    return res.render("register");
                }
                
                passport.authenticate("local")(req, res,
                    function() {
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
        res.redirect("/");
    });

//Check if user is logged in. Redirect to login page if the user in not logged in.
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;