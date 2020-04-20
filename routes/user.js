const express = require("express");

const Router = express.Router();

const UserModel = require("../model/user-model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

let sess;

// get route
Router.get("/", (req, res) =>{
    sess=req.session;
    sess.email=" "
    console.log(">>>>",sess.email);
    res.render('index',{error: req.query.valid?req.query.valid:'',
                        msg: req.query.msg?req.query.msg:''})

})

// render form for sighnup
Router.get("/signup", (req, res) =>{
   res.render("signup")
})

// storedata in mongo
// returns a promise
Router.post("/signup", (req, res) =>{
    //res.render("signup")
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    console.log(hashedPassword)

    const User = UserModel.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        accountType: 0
    })

    console.log(User);
    res.send({message: "user created succesfully"})
})

// render form for login
Router.get("/login", (req, res) =>{
    res.render("login")
 })
 
// store token in locak storage
// localstorage
// post route
Router.post("/login", (req, res) =>{
    UserModel.findOne({email: req.body.email}, (err,user) =>{
        if(err) {return res.status(500).send({message: "error on server"})}
        if(!user) { res.redirect("/user/login")};

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(passwordIsValid)
        {
            const token = jwt.sign({id: user._id}, "secret key is this", {expiresIn: 86400})
            res.send({token: token})
        }
        else
        {
            res.send({message: "invalid user"})
        }
    })
    
    // res.send({
    //     token: 1234567890
    // })
})


Router.get("/profile", (req, res) =>{
    res.send({
        message: "User successfully logged out."
    })
})

// export module
module.exports = Router