// import express library
import * as express from "express";
import * as passport from "../config/passport";
import * as LibraryFunctions from "../config/library";
import { IUser } from "../types/IUser";
import * as User from "../models/User";
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", { title: "[Your Logo Here] CMS" });
});

router.get("/success", LibraryFunctions.checkAuthentication, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("success", { title: "Succcess!" });
});


// User authentication
router.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(req.body);
  passport.authenticate("login", (err: Error, user: IUser, info: Object) => {
    if (err) {
      res.status(401);
      res.json({status: "Something went wrong. Please try again."});
    } else if (!user) {
      res.status(401);
      res.json({status: "Invalid username/password. Please try again."});
    } else if (user) {
      res.status(200);
      req.login(user, (err) => {
        if (err) 
          return next(err);
        res.json({status: "Success", redirect: "/success"});
      });    
    }
  })(req, res, next);
});

// User creation
router.post("/register", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const user = new User({username: req.body.username});
  user.setPassword(req.body.password);
  user.save((err: Error, user: IUser) => {
    if (err) {
      res.status(401);
      res.json({status: "Something went wrong. Please try again."});
    } else {
      res.status(200);
      res.json({status: "Success the user has been created!"});
    }
  });
});

// User deletion
router.post("/delete", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const username = req.body.username;
  User.remove({"username": username}, (err) => {
    if (err) {
      res.status(401);
      res.json({status: "Something went wrong. Could not delete user."});
    } else {
      res.status(200);
      res.json({status: "Success the user has been deleted!"});
    }
  });
});

export = router;