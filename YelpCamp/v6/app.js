// Require external modules
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

// Require models, seeding functions, etc.
var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(require("express-session")({
        secret: "It's a secret to everybody...",
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
        res.locals.currentUser = req.user;
        next();
    });

mongoose.connect("mongodb://localhost/yelp_camp_v6");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//seedDB();

// Landing page
app.get("/",
    function(req, res) {
       res.render("landing");
    });

//====================
// CAMPGROUNDS ROUTES
//====================

// INDEX route - shows all campgrounds
app.get("/campgrounds",
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
app.post("/campgrounds",
    function(req, res) {
        var newCampground = {
            name: req.body.name,
            image: req.body.image,
            description: req.body.description
        };
        
        Campground.create(newCampground,
            function(err, addedCampground) {
                if(err) {
                    console.log("I AM ERROR");
                    console.log(err);
                } else {
                    console.log("A new campground has been added!");
                    console.log(addedCampground);
                    res.redirect("/campgrounds");
                }
            }
        );
    });

// NEW route - shows the form to create a new campground
app.get("/campgrounds/new",
    function(req, res) {
        res.render("campgrounds/new");
    });

// SHOW route - displays info about a specific campground
app.get("/campgrounds/:id",
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

//====================
//COMMENT ROUTES
//====================

// Comment NEW route - shows a form to create a new comment
app.get("/campgrounds/:id/comments/new",
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
app.post("/campgrounds/:id/comments",
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

//===============
// AUTH ROUTES
//===============

// Show register form
app.get("/register",
    function(req, res) {
        res.render("register");
    });

// Handle Signup Logic
app.post("/register",
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
app.get("/login",
    function(req, res) {
        res.render("login");
    });

// Handle Login Logic
app.post("/login", 
    passport.authenticate("local", {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        }), 
    function(req, res) {}
    );

// Logout route
app.get("/logout",
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

//Start listening
app.listen(process.env.PORT, process.env.IP, function() {
        console.log("YelpCamp Server has started listening...");
    });