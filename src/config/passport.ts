import * as passport from "passport";
import * as localPassport from "passport-local";
import * as User from "../models/User";
import { IUserModel } from "../types/IUser";

const LocalStrategy = localPassport.Strategy;
// console.log(LocalStrategy);
passport.use("login", new LocalStrategy((username: string, password: string, done: Function) => {
  User.findOne({username: username}, (err: any, user: IUserModel) => {
    // general error
    if (err) {
      return done(err);
    }

    // can't find user
    if (!user) {
      return done(undefined, false, {message: "Incorrect Username"});
    }

    // passport is wrong
    if (!user.validPassword(password)) {
      return done(undefined, false, { message: "Invalid password"});
    }
       
    return done(undefined, user);
  });
}));

passport.serializeUser((user: IUserModel, done: Function) => {
  done(undefined, user.username);
});

passport.deserializeUser((username: string, done: Function) => {
  User.find({"username": username}, (err: any, user: IUserModel) => {
    done(err, user);
  });
});

export = passport;