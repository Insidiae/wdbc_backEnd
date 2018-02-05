// Require dependencies
var express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose");

// App config
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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
        .catch(catcherFn);
});

// NEW Route (GET /blogs/new) - Shows a form for creating a new blog post.
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE Route (POST /blogs) - Creates a new blog post based on the submitted form data
app.post("/blogs", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog)
        .then(function(newBlog) {
            res.status(201).redirect("/blogs");
        })
        .catch(catcherFn);
});

// SHOW Route (GET /blogs/:id) - Shows the full content of a blog
app.get("/blogs/:id", function(req, res) {
   Blog.findById(req.params.id)
    .then(function(foundBlog) {
        res.render("show", {blog: foundBlog});
    })
    .catch(catcherFn);
});

// EDIT Route (GET /blogs/:id/edit) - Shows a form for editing a blog post with the matching id
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id)
    .then(function(foundBlog) {
        res.render("edit", {blog: foundBlog});
    })
    .catch(catcherFn);
});

// NOTE: Since HTML forms do NOT support PUT and DELETE requests, we use the method-override package to, well, override methods.
//       method-override listens for "_method" in the query strings, then overrides the HTTP method with the value found in _method.

// UPDATE Route (PUT /blogs/:id) - Modifies the blog post with matching id, based on submitted form data
// method-override: (POST /blogs/:id?_method=PUT)
app.put("/blogs/:id", function(req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog)
        .then(function(updatedBlog) {
            res.redirect("/blogs/" + req.params.id);
        })
        .catch(catcherFn);
});

// DELETE Route (DELETE /blogs/:id) - Deletes the blog post with matching id from the database.
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id)
        .then(function(deletedBlog) {
            res.redirect("/blogs");
        })
        .catch(catcherFn);
});

// Error "handling" function - simply console.logs whatever error is encountered.
function catcherFn(err) {
    console.log(err);
}

// Start Listening
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server has started listening...");
});