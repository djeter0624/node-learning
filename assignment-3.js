Imports
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// create instance of Mongodb client
const MongoClient = require("mongodb").MongoClient;

// connection to Mongodb instance
const MongoURL = "mongodb://localhost:27017";

// body parser package is used to get info about data in body
app.use(bodyParser.json({type: "application/json"}));

app.use(bodyParser.text({type: "text/html"}));



// get call
app.get("/movies", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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
app.get("/movies/top3", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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
app.get("/movies/:name", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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
app.post("/movies", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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
app.put("/movies/:id", (req, res)=>{
    // console.log(req.params.id);
    MongoClient.connect(MongoURL, (err, client)=>{
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
app.get("/movies/super", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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
app.get("/movies/achievement", (req, res) =>{
    // connect mongoUrl to mongo instance
    MongoClient.connect(MongoURL, (err, client)=>{
        
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



app.listen(8080);





/************************************************************************************************************************************** */
// Danielle Jeter Queries used in command line after running mongod and mongo

/*
1. add 5 movies 
app.post -> insert
db.movies.insert( { name: "Toy Story", genre: "Family", rating: "8", language: "ENGLISH" } )
> db.movies.insert( { name: "Frozen 2", genre: "Musical", rating: "9", language: "ENGLISH" } )
> db.movies.insert( { name: "Lion King 2", genre: "Adventure", rating: "10", language: "ENGLISH" } )
> db.movies.insert( { name: "Mulan 2", genre: "Action", rating: "8.5", language: "ENGLISH" } )
> db.movies.insert( { name: "Tarzan", genre: "Adventure", rating: "9", language: "ENGLISH" } )
*/

/*
2. return all movies
app.get -> find()
db.movies.find()
*/

/*
3. findOne() method
get method/:name
*/

/*
4. return the 3 highest movies
db.movies.find().sort({rating: -1}).limit(3)
*/

/*
5. add key called achievements in 2 documents (1 'Super hit', and 1 'Super Duper hit')
put method /:id

*/

/*
6. return movies with super hit and super duper hit

db.movies.find({$or: [ {achievement : "Super Hit"}, {achievement : "Super Duper Hit"} ]})

or 

db.movies.find( { achievement: { $in: ["Super Hit", "Super Duper Hit"] } } )

or 
db.movies.find({ $and: [ {achievement: "Super Hit"}, {achievement: "Super Duper Hit"}]})
*/


/*
7. return only movies with achieivement
db.movies.find({achievement:  {$exists: true } })
*/

/************************************************************************************************************************************** */
