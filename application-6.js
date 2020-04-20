const express = require("express");
const app = express();

// path
const path = require("path");

// routes
const UserRoutes = require("./routes/user");
// use userroutes
app.use("/user", UserRoutes);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);


// export this app
// default export
module.exports = application;
