// Require external modules
var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");

// Require models, seeding functions, etc.
var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    indexRoutes = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes = require("./routes/comments");

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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
        res.locals.message = req.flash();
        res.locals.messageType = Object.keys(res.locals.message)[0];
        next();
    });

mongoose.connect("mongodb://localhost/yelp_camp_v12");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//seedDB();

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//404
app.get("*",
    function(req, res) {
       res.redirect("back"); 
    });

//Start listening
app.listen(process.env.PORT, 
    process.env.IP, 
    function() {
        console.log("YelpCamp Server has started listening...");
    });