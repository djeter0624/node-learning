// impoerts
const express = require('express');
const router = express.Router();
// local storage 
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');
// For generating Token
const jwt = require('jsonwebtoken');
// For encrypting Password
const bcrypt = require('bcryptjs');
// For Secert Token
const config = require('../config');
// For User and Product Schema
const User = require('../user/User');
const Product = require('../user/Product');
// session
const session = require('express-session');

// router, session, and secret
router.use(session({secret: 'theSecret1', resave: false, saveUninitialized: true}));
app.set('view engine', 'ejs');

// body parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Register User
router.post('/register', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // create a User
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword,
      accountType: 0
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      const string = encodeURIComponent('Success Fully Register Please Login');
      res.redirect('/?msg=' + string);
    }); 
  });


  // Add a user
router.post('/addUser', function(req, res) {
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    // create a user
    User.create({
      username : req.body.username,
      email : req.body.email,
      password : hashedPassword,
      accountType: req.body.accountType
    },
    function (err, user) {
      if (err) return res.status(500).send("There was a problem registering the user.")
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      const string = encodeURIComponent('Success Fully Register Please Login');
      res.redirect('/?msg=' + string);
    }); 
  });

   // Add Product
router.post('/addProduct', function(req, res) {
    // create a product
    Product.create({
        name : req.body.name,
        price : req.body.price
    })
    // redirect to the dashboard
    // const string = encodeURIComponent('Success adding product');
    res.redirect("/users/profile");
});


// Login User
router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.');
      const string = encodeURIComponent('! Please enter valid value');
      if (!user) { res.redirect('/?valid=' + string);}
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        localStorage.setItem('authtoken', token)
        res.redirect(`/users/profile`);
      }
    });
});

// Information about logined User
router.get('/loginedUser', function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    // verify token
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

      User.findById(decoded.id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
    });
  });



  module.exports = router;