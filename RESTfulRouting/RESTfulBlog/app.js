// Require dependencies
var express = require("express"),
    app = express(),
    mongoose = require("mongoose");

// App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// Mongoose/Model Config
mongoose.connect("mongodb://localhost/restful_blog");
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes

// INDEX Route (GET /blogs) - Lists all blogs
// Root (/) route should also redirect to the Index Route.
app.get("/", function(req, res) {
   res.redirect("/blogs"); 
});

app.get("/blogs", function(req, res){
    Blog.find()
    .then(function(blogs) {
        res.render("index", {blogs: blogs});
    })
    .catch(function(err) {
        console.log(err);
    });
});

// NEW Route (GET /blogs/new) - Shows a form for creating a new blog post.
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE Route (POST /blogs) - Creates a new blog post based on the submitted form data
app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog)
        .then(function(newBlog) {
            res.status(201).redirect("/blogs");
        })
        .catch(function(err) {
            console.log(err);
        });
});

// Start Listening
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started listening...");
});