const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("user/signup.ejs");
});

router.post("/signup", async (req, res) => {

    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (userInDatabase) {
            return res.send('Username already taken.');
        }

        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Password and Confirm Password must match');
        }

        req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        await User.create(req.body)

        res.redirect("/user/login")
    } catch (err) {
        res.sendStatus(400).json(err);
    }
});

router.post("/login", async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            res.send("User doesnt exist");
        } else {
            const passwordsMatch = bcrypt.compareSync(req.body.password, user.password);

            if (passwordsMatch) {
                req.session.username = req.body.username;
                req.session.isAdmin = user.isAdmin
                req.session.userId = user._id
                req.session.alias = user.alias
                res.redirect("/workflow");
            } else {
                res.send("wrong password");
            }
        }
    } catch (err) {
        res.sendStatus(400).json(err);
    }
});

router.get("/login", (req, res) => {
    res.render("user/login.ejs");
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/user/login")
    })
})

module.exports = router;