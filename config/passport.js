"use strict";
const passport = require("passport");
const localPassport = require("passport-local");
const User = require("../models/User");
const LocalStrategy = localPassport.Strategy;
// console.log(LocalStrategy);
passport.use("login", new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
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
passport.serializeUser((user, done) => {
    done(undefined, user.username);
});
passport.deserializeUser((username, done) => {
    User.findById(username, (err, user) => {
        done(err, user);
    });
});
module.exports = passport;
