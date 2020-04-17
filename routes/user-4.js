const express = require("express");
const Router = express.Router();
const UserModel = require("../model/user-model-4")

const {calculateDaysDiff} = require("../util/calculate-4")

// get
Router.get("/", (req, res) =>{
    res.render("add-user-4", {});
})

Router.get("/dashboard", (req, res)=>{
    UserModel.find().then((response)=>{
        console.log(response);

        for (let index = 0; index < response.length; index++) {
            const user = response[index];

            const diff = calculateDaysDiff(user.createdOn);

            if(diff > 2)
                {
                    user.status = "delivered"
                }
            else if(diff === 1)
                {
                    user.status = "dispatched"
                }
            else if (diff === 0)
                {
                    user.status = "in-progress"
                }
        }

        res.render("dashboard-4", { posts : response });
    })
});


Router.post("/", (req, res)=>{
    const User = new UserModel({
        name : req.body.name.trim(),
        address : req.body.address.trim(),
        email : req.body.email.trim(),
        item: req.body.item.trim()
    })
    User.save();
    // res.send("user has been added...");
    res.redirect("/user/dashboard")
});


// // Danielle
// // post
// Router.post("/", (req, res) =>{

//     console.log(req.body);

//     const User = new UserModel({
//         name: req.body.name,
//         address: req.body.address,
//         email: req.body.email,
//         item: req.body.item
//     });

//     // save user
//     User.save();

//     res.render("add-user-4", {});
// })



module.exports = Router;