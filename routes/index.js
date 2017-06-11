"use strict";
// import express library
const express = require("express");
const passport = require("../config/passport");
const LibraryFunctions = require("../config/library");
const User = require("../models/User");
const router = express.Router();
router.get("/", (req, res, next) => {
    res.render("index", { title: "[Your Logo Here] CMS" });
});
router.get("/success", LibraryFunctions.checkAuthentication, (req, res, next) => {
    res.render("success", { title: "Succcess!" });
});
// User authentication and creation
router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            res.status(401);
            res.send("Something went wrong. Hold on.");
        }
        else if (!user) {
            res.status(401);
            res.send("Invalid username/password. Please try again.");
        }
        else if (user) {
            res.status(200);
            req.login(user, (err) => {
                if (err)
                    return next(err);
                res.redirect("/success");
            });
        }
    })(req, res, next);
});
router.post("/register", (req, res, next) => {
    const user = new User({ username: req.body.username });
    user.setPassword(req.body.password);
    user.save((err, user) => {
        if (err) {
            res.status(401);
            res.send("Something went wrong. Please try again.");
        }
        else {
            res.status(200);
            res.send("Success the user has been created!");
        }
    });
});
module.exports = router;
