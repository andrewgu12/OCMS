"use strict";
// import express library
const express = require("express");
const passport = require("../config/passport");
const LibraryFunctions = require("../config/library");
const router = express.Router();
router.get("/", (req, res, next) => {
    res.render("index", { title: "[Your Logo Here] CMS" });
});
router.get("/login-success", LibraryFunctions.checkAuthentication, (req, res, next) => {
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
            res.redirect("/login-success");
        }
    })(req, res, next);
});
router.post("/register", (req, res, next) => {
});
module.exports = router;
