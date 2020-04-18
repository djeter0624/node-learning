// imports
const {Schema, model} = require("mongoose");
var moment = require("moment");
moment().format();

// user Schema
const UserSchema = new Schema({
    title: String,
    description: String,
    time: {type: String, default: moment().format('LTS')},
    date: {type: String, default: moment().format('l')},
    assignee: String,
    createdOn: {type: Date, default: Date.now()}
});

// create user model
const UserModel = new model("user", UserSchema, "user");

// export module
module.exports = UserModel;