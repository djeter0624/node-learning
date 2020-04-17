const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// mongoose 
const mongoose = require("mongoose");
// db via mongoose
// get connection from util folder/ mongo file
// must define the database name in the url
const db = mongoose.connect("mongodb://localhost:27017/demodb", { useUnifiedTopology: true })
// , {useNewUrlParser: true} 
// ,  { useUnifiedTopology: true }

//import ejs
const ejs = require("ejs");

// define app to use ejs
app.set("view engine", "ejs");

// body parser package is used to get info about data in body
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.text({type: "text/html"}));
app.use(bodyParser.urlencoded({extended: true}));


// import the routes so you can use them
const user = require("./routes/user-4")

// to use the routers from the routes-5 folder
app.use("/user", user);

app.listen(2700, () =>{
    console.log("Server Started...")
})

