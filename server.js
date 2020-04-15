const express = require("express");
const ejs = require("ejs");
const app = express();
const axios = require("axios").default;


// set vide engine
app.set("view engine", "ejs");

app.get("/", (req, res) =>{
    // res.send("hello");
    // to create a template, we need to create a views folder

    // retrieve the data
    axios.get("http://5c055de56b84ee00137d25a0.mockapi.io/api/v1/employees")
    .then((response)=>{
         // render the view 
         res.render("index.ejs", {posts: response.data, heading: "Assingment 2 List"});
    })
    .catch((err)=>{
        console.log(err)
    });
});

app.listen(8082, () =>{
    console.log("server started");
});

