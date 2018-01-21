// require the mongoose library
var mongoose = require("mongoose");
// connect to the cat_app database
mongoose.connect("mongodb://localhost/cat_app");

// define some sort of template for new cat objects
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// create a new mongo collection using the previously created Schema
// e.g. this will create the db.cats collection
var Cat = mongoose.model("Cat", catSchema);

// add a new cat to be added to the database
// var addCat = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// // save the new cat to the database
// addCat.save(function(err, cat) {
//     if(err) {
//         console.log("Something went wrong :(");
//         console.log(err);
//     } else {
//         console.log("Cat has been saved to the database!");
//         console.log(cat);
//     }
// });

// ALTERNATE WAY OF ADDING A NEW CAT
// Cat.create({
//     name: "Kate",
//     age: 8,
//     temperament: "Catty"
// }, function(err, cat) {
//     if(err) {
//         console.log("Something went wrong :(");
//         console.log(err);
//     } else {
//         console.log("Cat has been saved to the database!");
//         console.log(cat);
//     }
// });

// retrieve all cats from the database and then console.log each one
Cat.find({}, function(err, cats) {
    if(err) {
        console.log("I AM ERROR.");
        console.log(err);
    } else {
        console.log("ALL THE CATS......")
        console.log(cats);
    }
})