var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app = express();

var User = require("./models/user");

app.use(require("express-session")({
    secret: "The magic words are squeamish ossifrage",
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost/auth_demo_app");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//===============
//    ROUTES
//===============

app.get("/", 
    function(req, res) {
        res.render("home");
    });

//SECRET PAGE: ONLY REGISTERED USERS MAY VIEW THIS!!!
app.get("/secret",
    isLoggedIn,
    function(req, res) {
       res.render("secret"); 
    });

//Auth routes
// Show signup Form
app.get("/register", 
    function(req, res) {
        res.render("register");
    });

// Handle user signups
app.post("/register", 
    function(req, res){
        //Create a db entry for the new user
        //Only the username is included in the new User() object; the password should be hashed by the register() function first.
        //Now, what is actually stored in the database looks like this:
        //{
        //  username: String,
        //  salt: HexString,
        //  hash: HexString
        //}
        User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
            if(err) {
                console.log(err);
                return res.render("register");
            }
            //The passport.authenticate() method "logs the user in", when the new user has successfully registered.
            //You can use different "strategies" for passport.authenticate.
            //Here, we use the "local" strategy which just uses the traditional username/password form.
            //The registered user should now be able to access the secret page.
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
        });
    });

//Show login form
app.get("/login", 
    function(req, res) {
        res.render("login");
    });

//Handle login logic

//PassportJS is an example of what is known as a middleware
//  middleware is some code that runs before our route callback, serving as some sort of bridge
//  multiple middleware can be stacked on top of each other
//Here, passport.authenticate() compares the login data to the database entries, checking if the username and (hashed) password matches.
//  The user should be redirected to the secret page if the login is successful, otherwise just display the login form again.
app.post("/login", 
    passport.authenticate("local", {
            successRedirect: "/secret",
            failureRedirect: "/login"
        }), 
    function(req, res) {
    
    });

//Logout logic
app.get("/logout",
    function(req, res) {
        req.logout();
        res.redirect("/");
    });

//Create a middleware function to check if the user is logged in
//  this function executes the next function only if the user is currently logged in
//  otherwise the user shall be redirected to the login page
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}

//Start listening
app.listen(process.env.PORT, 
    process.env.IP, 
    function() {
        console.log("Server has started listening...");
    });