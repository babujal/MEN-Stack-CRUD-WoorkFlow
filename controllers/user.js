const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

//saving the data from the signup page
router.post("/signup", async (req, res) => {

    try{
        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
        
        // once the password has been hased create the user in the DB
        await User.create(req.body)
    
        //then redirect to /user/login
        res.redirect("/user/login")
    } catch(err){
        res.sendStatus(400).json(err);
    }
});

//logging in
router.post("/login", async (req, res) => {
    
    try{
        //find a user from the user table using the user name
        const user = await User.findOne({ username: req.body.username});

        //if there is NO user found
        if(!user){
            res.send("User doesnt exist");
        } else {
        // users that are found go to this else block
            //now compare the passwords that was typed into the form agains the password on the db
            const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);

            //if the passwords match go to /fruits page
            if(passwordsMatch){
                req.session.username = req.body.username;
                req.session.isAdmin = user.isAdmin
                req.session.userId = user._id
                res.redirect("/workflow");
            } else {
            //passwords DO NOT match, send this string
                res.send("wrong password");
            }
        }
    } catch(err){
        res.sendStatus(400).json(err);
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.get("/logout", (req, res) => {
    // destroy session and redirect to main page
    req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})

module.exports = router;