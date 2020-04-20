// imports
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const LocalStorage = require('node-localstorage').LocalStorage;
const config = require('../config.js');
const jwt = require('jsonwebtoken');
localStorage = new LocalStorage('./scratch');

// body parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// schemas
const User = require('./User');
const Product = require('./Product');



// get all users in the db
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});



// get specific user from db
    router.get('/profile', function (req, res) {
        Product.find().then((prodResponse)=>{
            // get token
            var token = localStorage.getItem('authtoken')
            if (!token) {
                res.redirect('/')
            }
            // verify token
            jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
                User.findById(decoded.id, { password: 0 }, function (err, user) {
                    if (err) {res.redirect('/')}
                    if (!user) {res.redirect('/')}
                    
                    if(user.accountType === 1 )
                    {
                        res.render('profile1.ejs',{user, prods: prodResponse})
                    }
                    else
                    {
                        res.render('profile.ejs',{user, prods: prodResponse})
                    }
                        
                });
            });
        });
    });


    // get user list from db
    router.get('/user-list', function (req, res) {
        User.find().then((response)=>{
            // get token
            var token = localStorage.getItem('authtoken')
            if (!token) {
                res.redirect('/')
            }
            // verify token
            jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                res.redirect('/')
            };
                User.findById(decoded.id, { password: 0 }, function (err, user) {
                    if (err) {res.redirect('/')}
                    if (!user) {res.redirect('/')}
                        
                    if(user.accountType === 1 )
                    {
                        res.render('user-list.ejs',{user, posts: response})
                    }
                    else
                    {
                        res.render('profile.ejs',{user})
                    }
                    
                });
            });
        });
    });
    
    // add user to db
    router.get('/add-user', function (req, res) {
        // get token
        var token = localStorage.getItem('authtoken')
        if (!token) {
            res.redirect('/')
        }
        // verify token
        jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            res.redirect('/')
        };
            User.findById(decoded.id, { password: 0 }, function (err, user) {
                if (err) {res.redirect('/')}
                if (!user) {res.redirect('/')}
                if(user.accountType === 1 )
                {
                    res.render('add-user.ejs',{user})
                }
                else
                {
                    res.render('profile.ejs',{user})
                }
                
            });
        });
    });


// add product
router.get('/add-product', function (req, res) {
    // get token
    var token = localStorage.getItem('authtoken')
    if (!token) {
        res.redirect('/')
    }
    // verify token
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {
        res.redirect('/')
    };
        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {res.redirect('/')}
            if (!user) {res.redirect('/')}
            if(user.accountType === 1 )
            {
                res.render('add-product.ejs',{user})
            }
            else
            {
                res.render('profile.ejs',{user})
            }
            
        });
    });
});

// get method to sign up
router.get('/signup',  (req, res) => {
    res.render('signup.ejs')
 });

 // get method to logout
 router.get('/logout', (req,res) => {
     localStorage.removeItem('authtoken');
     res.redirect('/');
 })

module.exports = router;