////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", (req, res) => {
    res.render("user/Signup.jsx");
});

router.post("/signup", async (req, res) => {
    //res.send("signup");
    //encrypt password
    req.body.password = await bcrypt.hash(req.body.password,
        await bcrypt.genSalt(10)
    );

    //create new user
    User.create(req.body)
        .then((user) => {
            // redirect to login page
            res.redirect("/user/login");
        })
        .catch((error) => {
            //send the error as json
            console.log(error);
            res.json({ error });
        })
});

// The login Routes (Get => form, post => submit form)
router.get("/login", (req, res) => {
    res.render("user/Login.jsx");
});

router.post("/login", (req, res) => {
    //res.send("login");
    // get the data from the request body
    const { username, password } = req.body;
    //search for the user
    User.findOne({ username })
        .then(async (user) => {
            //user exists
            if (user) {
                //compare password
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    //redirect to movies page
                    res.redirect("/movies");
                }
                else {
                    // error if password does not match
                    res.json({ error: "password does not match" });
                }
            }
            else {
                // send error if user doesn't exist
                res.json({ error: "user does not exist" });
            }
        })
        .catch((error) => {
            //send the error as json
            console.log(error);
            res.json({ error });
        });
});

/////////////////////////////////////////
// Export the Router
/////////////////////////////////////////
module.exports = router;