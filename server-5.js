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

// import the routes so you can use them
const home = require("./routes-5/index")
const movies = require("./routes-5/movies")

// body parser package is used to get info about data in body
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.text({type: "text/html"}));


// to use the routers from the routes-5 folder
app.use("/", home);
app.use("/movies", movies);

app.listen(2800, () =>{
    console.log("Server Started...")
})

