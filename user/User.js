// Schema and model
const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    accountType: Number
});


const UserModel = new model("user", UserSchema, "user6");

module.exports = UserModel;