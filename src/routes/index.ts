// import express library
import * as express from "express";
import * as passport from "../config/passport";
import * as LibraryFunctions from "../config/library";
import { IUserModel } from "../types/IUser";
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", { title: "[Your Logo Here] CMS" });
});

router.get("/login-success", LibraryFunctions.checkAuthentication, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("success", { title: "Succcess!" });
});


// User authentication and creation
router.post("/login", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  passport.authenticate("login", (err: Error, user: IUserModel, info: Object) => {
    if (err) {
      res.status(401);
      res.send("Something went wrong. Hold on.");
    } else if (!user) {
      res.status(401);
      res.send("Invalid username/password. Please try again.");
    } else if (user) {
      res.status(200);
      res.redirect("/login-success");
    }
  })(req, res, next);
});

router.post("/register", (req: express.Request, res: express.Response, next: express.NextFunction) => {

});



export = router;