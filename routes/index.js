"use strict";
// import express library
var express = require("express");
var passport = require("../config/passport");
var LibraryFunctions = require("../config/library");
var User = require("../models/User");
var router = express.Router();
router.get("/", function (req, res, next) {
    res.render("index", { title: "[Your Logo Here] CMS" });
});
router.get("/success", LibraryFunctions.checkAuthentication, function (req, res, next) {
    res.render("success", { title: "Succcess!" });
});
// User authentication
router.post("/login", function (req, res, next) {
    console.log(req.body);
    passport.authenticate("login", function (err, user, info) {
        if (err) {
            res.status(401);
            res.json({ status: "Something went wrong. Please try again." });
        }
        else if (!user) {
            res.status(401);
            res.json({ status: "Invalid username/password. Please try again." });
        }
        else if (user) {
            res.status(200);
            req.login(user, function (err) {
                if (err)
                    return next(err);
                res.json({ status: "Success", redirect: "/success" });
            });
        }
    })(req, res, next);
});
// User creation
router.post("/register", function (req, res, next) {
    var user = new User({ username: req.body.username });
    user.setPassword(req.body.password);
    user.save(function (err, user) {
        if (err) {
            res.status(401);
            res.json({ status: "Something went wrong. Please try again." });
        }
        else {
            res.status(200);
            res.json({ status: "Success the user has been created!" });
        }
    });
});
// User deletion
router.post("/delete", function (req, res, next) {
    var username = req.body.username;
    User.remove({ "username": username }, function (err) {
        if (err) {
            res.status(401);
            res.json({ status: "Something went wrong. Could not delete user." });
        }
        else {
            res.status(200);
            res.json({ status: "Success the user has been deleted!" });
        }
    });
});
module.exports = router;
