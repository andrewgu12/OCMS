"use strict";
var passport = require("passport");
var localPassport = require("passport-local");
var User = require("../models/User");
var LocalStrategy = localPassport.Strategy;
// console.log(LocalStrategy);
passport.use("login", new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        // general error
        if (err) {
            return done(err);
        }
        // can't find user
        if (!user) {
            return done(undefined, false, { message: "Incorrect Username" });
        }
        // passport is wrong
        if (!user.validPassword(password)) {
            return done(undefined, false, { message: "Invalid password" });
        }
        return done(undefined, user);
    });
}));
passport.serializeUser(function (user, done) {
    done(undefined, user.username);
});
passport.deserializeUser(function (username, done) {
    User.find({ "username": username }, function (err, user) {
        done(err, user);
    });
});
module.exports = passport;
