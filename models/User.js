"use strict";
// Schema for users who have access to OCMS
var mongoose = require("mongoose");
var crypto = require("crypto");
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: { type: String, default: "" },
    salt: { type: String, default: "" }
});
// Don't use fat arrow syntax here!
userSchema.methods.setPassword = function (pass) {
    this.salt = crypto.randomBytes(64).toString("hex");
    this.hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
};
userSchema.methods.validPassword = function (pass) {
    var hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
    return this.hash === hash;
};
var User = mongoose.model("User", userSchema);
module.exports = User;
