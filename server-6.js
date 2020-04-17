const express = require("express");

// use applciation-6
const application = require("./application-6");


// port
port = 3000;

// connect to mongodb
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demodb", {useNewUrlParser: true})



// start server
const server = application.listen(port, () =>{
    console.log(`server started at ${port}`);
})