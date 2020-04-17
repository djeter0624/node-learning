const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    name: String,
    genre: String,
    rating: Number,
    language: String,
    achievement: String
});


// convert schema into a model
const moviesModel = mongoose.model("movies", moviesSchema);

//export module
module.exports = moviesModel
