// imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8083;
const user = require('./routes/index-9');
const config = require('config');

//db connection      
mongoose.connect("mongodb://localhost:27017/demodb", { useNewUrlParser: true })

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    
    //morgan is used to log the command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

// body parser                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// app.get
app.get("/", (req, res) => 
res.json({message: "Users Portal"}));

// app routes
app.route("/user").get(user.getUsers)
app.route("/user").post(user.postUser);
app.route("/user/:id").get(user.getUser)
app.route("/user/:id").put(user.updateUser);
app.route("/user/:id").delete(user.deleteUser)

// listen to the port
app.listen(port);
console.log("Listening on port " + port);

// export modules
module.exports = app; 
