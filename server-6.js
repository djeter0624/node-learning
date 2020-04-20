// imports
const express = require("express");
const app = express();
// port
port = 3000;
// body parser
const bodyParser = require("body-parser");
// body parser package is used to get info about data in body
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.text({type: "text/html"}));
app.use(bodyParser.urlencoded({extended: true}));
// session
const session = require('express-session');
//import ejs
const ejs = require("ejs");
// define app to use ejs
app.set("view engine", "ejs");

// connect to mongodb database
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demodb", {useNewUrlParser: true})

// routes
const UserController = require('./user/UserController');
app.use('/users', UserController);

const AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

// session
app.use(session({secret: 'theSecret'}));

let sess;

// get 
app.get('/',(req,res) => {
    sess=req.session;
    sess.email=" "
    // render ejs file
    res.render('index-6',{error: req.query.valid?req.query.valid:'',
                        msg: req.query.msg?req.query.msg:''})
})

// start server
app.listen(port, () =>{
    console.log("Server started at ", port);
});