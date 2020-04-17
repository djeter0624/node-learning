const express = require("express");
const application = express();
// routes
const UserRoutes = require("./routes/user");

const bodyParser = require("body-parser");

// path
const path = require("path");


// use userroutes
application.use("/user", UserRoutes);


application.set("view engine", "ejs");
application.set("views", path.join(__dirname, "./views"));

application.use(bodyParser.urlencoded({extended: true}));
application.use(bodyParser.json);


// export this app
// default export
module.exports = application;
