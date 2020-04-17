const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    name: String,
    address: String,
    email: String,
    item: String,
    createdOn: {type: Date, default: Date.now}
});


const UserModel = new model("user", UserSchema);

module.exports = UserModel;