"use strict";
// Schema for users who have access to OCMS
const mongoose = require("mongoose");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: { type: String, default: "" },
    salt: { type: String, default: "" }
});
userSchema.methods.setPassword = (pass) => {
    this.salt = crypto.randomBytes(64).toString("hex");
    this.hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
};
userSchema.methods.validPassword = (pass) => {
    const hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
    return this.hash === hash;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
