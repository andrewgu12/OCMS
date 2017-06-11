// Schema for users who have access to OCMS

import * as mongoose from "mongoose";
import * as crypto from "crypto";
import { IUserModel } from "../types/IUser";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hash: {type: String, default: ""},
  salt: {type: String, default: ""}
});

userSchema.methods.setPassword = (pass: string) => {
  this.salt = crypto.randomBytes(64).toString("hex");
  this.hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
};

userSchema.methods.validPassword = (pass: string) => {
  const hash = crypto.pbkdf2Sync(pass, this.salt, 100000, 512, "sha512").toString("hex");
  return this.hash === hash;
};

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);
export = User;