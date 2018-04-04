// Set up mongoose
var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
   title: String,
   content: String
});

// module.exports
//  -considered as the "return value" for a file
//  -when this file is require()-d, the value in the module.exports gets passed on to the requiring file. 
//  -in this case, we export the mongoose model for the post schema.

module.exports = mongoose.model("Post", postSchema);