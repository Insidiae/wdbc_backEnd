// Set up mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// Define mongoose schemas for users and posts
//  To associate data by embedding them, first define the schema for the data to be embedded.
//  Then, define the schema for the table where the data will be embedded to.
//      - Inside this schema, define a list that contains the schema for the embedded data.

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema]
});

// Define mongoose models for users and posts
var User = mongoose.model("User", userSchema);
var postModel = mongoose.model("Post", postSchema);

// Generate some initial data for the database
// User.create({
//     name: "John Doe",
//     email: "johndoe@example.com"
// }, function(err, createdUser) {
//     if(err) {
//         console.log("Something went wrong :(");
//         console.log(err);
//     } else {
//         console.log("A new user has been created!");
//         console.log(createdUser);
//     }
// });

// postModel.create({
//   title: "My second post!",
//   content: "This is another post."
// }, function(err, createdPost) {
//     if(err) {
//         console.log("Something went wrong :(");
//         console.log(err);
//     } else {
//         console.log("A new post has been created!");
//         console.log(createdPost);
//     }
// });

// Example:
//  To associate a post to a user, first find the user where that post is to be associated.
//  Then push() a new post to that user's posts list (make sure that the post follows the schema)
//  Finally, save() the updated user info to the database.
User.findOne({name: "John Doe"})
    .then(function(foundUser) {
        foundUser.posts.push({
            title: "Another Test Post",
            content: "If you can see this, that means Embedding data is working well!"
        });
        foundUser.save(function(err, updatedUser) {
            if(err) {
                console.log(err);
            } else {
                console.log(updatedUser.name + " added a new post!");
                console.log(updatedUser);
            }
        });
    })
    .catch(function(err) {
        console.log("Sorry, something went wrong :(");
        console.log(err);
    });