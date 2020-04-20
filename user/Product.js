// Schema and model
const {Schema, model} = require("mongoose");

const ProductSchema = new Schema({
    name: String,
    price: Number
});


const ProductModel = new model("product", ProductSchema, "product6");

module.exports = ProductModel;