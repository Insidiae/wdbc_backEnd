// Set up mongoose
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

// Define mongoose schemas and models for users and posts
//  To associate data by referencing them, first define the schema and the model for the data to be referenced.
//  Then, define the schema for the table that contains the object references.
//      - Inside this schema, define a list that contains the object IDs (_id) for the embedded data.
//      - Note that you need to specify that the data type that the list contains is of mongoose.Schema.Types.ObjectId
//      - You also need to specify the mongoose model of the referenced data.

// To use the module.exports from the files in the models directory, simply require() them.
var Post = require("./models/post");
var User = require("./models/user");


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

// Example: Reference a post to a user
//  First, create the actual post.
//  Then in the callback function, find the user to be associated with the new post.
//  Then, push() the newly created post's ID (._id) to the user's posts list.
//  You should see that only the post IDs are pushed to the user's posts list.

// Post.create({
//   title: "Bacon Ipsum pt II",
//   content: "Bacon ipsum dolor amet flank ground round pig..."
// }, function(err, createdPost) {
//     if(err) {
//         console.log("Something went wrong :(");
//         console.log(err);
//     } else {
//         User.findOne({email: "johndoe@example.com"}, function(err, foundUser) {
//           if(err) {
//               console.log(err);
//           } else {
//               foundUser.posts.push(createdPost._id);
//               foundUser.save(function(err, updatedUser) {
//                   if(err) {
//                       console.log(err);
//                   } else {
//                       console.log(updatedUser.name + " added a new post!");
//                       console.log(updatedUser);
//                   }
//               });
//           }
//         });
//     }
// });

// Now, how do we find the posts associated with a certain user?
//  First find the user from the database
//  Then, use the post IDs to fetch the necessary posts
//  populate("posts") populates the user's posts list with the actual post data
//  exec() is required to actually exectue the commands.

// User.findOne({email: "johndoe@example.com"}).populate("posts").exec(function(err, foundUser) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("All posts by " + foundUser.name);
//         console.log(foundUser.posts);
//     }
// });