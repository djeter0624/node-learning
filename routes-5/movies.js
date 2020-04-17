// import getConnection
// add this to all files in routes folder
const {getConnection} = require("../util/mongo")

const express = require("express");
// create a router
const router = express.Router();



// get call
router.get("/", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        collection.find().toArray((err, docs) =>{
            // log documets to console
            console.log(docs);

            // send data as a response
            res.send(docs);

            // close the connection after the data is received
            client.close();
        })  
    })
});

// top 3
// get call
router.get("/top3", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        collection.find().sort({rating: -1}).limit(3).toArray((err, docs) =>{
            // log documets to console
            console.log(docs);

            // send data as a response
            res.send(docs);

            // close the connection after the data is received
            client.close();
        })  
    })
});


// findOne call
router.get("/:name", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        collection.findOne({name: req.params.name}, function (err, response){
            // log documets to console
            console.log(response);

            // send data as a response
            res.send(response);

            // close the connection after the data is received
            client.close();
        }) 
    })
});

// post call
router.post("/", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        // collection.insert(req.body, function(err, response){
        collection.save(req.body, function(err, response){
            res.send("inserted");

            // close the client
            client.close();
        }) 
    })
});

// put achievement call
router.put("/:id", (req, res)=>{
    // console.log(req.params.id);

    //get connection
    getConnection((err, client)=>{
        const db = client.db("demodb");
        const collection = db.collection("movies");
        //update query
        // collection.update({ name : "Black Panther" }, { $set : { achie : 2 } } ,function(err, response){
        collection.update({ name : req.params.id }, { $set : { achievement : "Super Duper Hit" } } ,function(err, response){
            console.log(err);
            res.send("updated.")
            client.close();
        })
    })
});

// super hit or super duper hit
router.get("/super", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        collection.find({$or: [ {achievement : "Super Hit"}, {achievement : "Super Duper Hit"} ]}).toArray((err, docs) =>{
            // log documets to console
            console.log(docs);

            // send data as a response
            res.send(docs);

            // close the connection after the data is received
            client.close();
        })  
    })
});


// get achievements call
router.get("/achievement", (req, res) =>{
    // connect mongoUrl to mongo instance

    //get connection
    getConnection((err, client)=>{        
        // get the database by name
        const db = client.db("demodb");

        // get the collection by name
        const collection = db.collection("movies");

        // collect the data
        // query is in {}
        // callback () => {}
        collection.find({achievement:  {$exists: true } }).toArray((err, docs) =>{
            // log documets to console
            console.log(docs);

            // send data as a response
            res.send(docs);

            // close the connection after the data is received
            client.close();
        })  
    })
});


// export the router
module.exports = router;