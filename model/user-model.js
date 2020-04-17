const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String
});


const UserModel = new model("user", UserSchema);

module.exports = UserModel;