// imports
const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user-model-5")

const {calculateDaysDiff} = require("../util/calculate-5")

// get add-user 
Router.get("/", (req, res) =>{
    res.render("add-user-5", {});
})

// get dashboard
Router.get("/dashboard", (req, res)=>{

    UserModel.find().then((response)=>{       

        for (let index = 0; index < response.length; index++) {
            const user = response[index];
            const diff = calculateDaysDiff(user.createdOn);
            let remain = 3- diff;
            user.remaining = remain;

        }  
        // render the dashboard ejs
        res.render("dashboard-5", { posts : response });
    })
});

// post new user to the database
Router.post("/", (req, res)=>{
    const User = new UserModel({
        title : req.body.title,
        description : req.body.description,
        assignee : req.body.assignee
    })
    // save user
    User.save();
    // redirect to the dashboard
    res.redirect("/user/dashboard")
});

// export module
module.exports = Router;