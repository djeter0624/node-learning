// import getConnection
// add this to all files in routes folder
const {getConnection} = require("../util/mongo")

const express = require("express");
// create a router
const router = express.Router();

// mongoose moveModel
const movieModel = require("../model/movies-model");

// take the root / from the server and place it in this route file
// get
router.get("/", (req, res)=>{
    // mongoose connection
    movieModel.find((err, docs) =>{
        console.log(docs);
        res.send(docs);    
    })
    
    // //get connection
    // getConnection((err, client)=>{
        
    //     // get the database by name
    //     const db = client.db("demodb");

    //     // get the collection by name
    //     const collection = db.collection("movies");

    //     // collect the data
    //     // query is in {}
    //     // callback () => {}
    //     collection.find().toArray((err, docs) =>{
    //         // log documets to console
    //         console.log(docs);

    //         // send data as a response
    //         res.send(docs);

    //         // close the connection after the data is received
    //         client.close();
    //     })  
    // });
});

// export the router
module.exports = router;

