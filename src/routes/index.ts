// import express library
import * as express from "express";
const router = express.Router();

export = (() => {
  router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render("index", {title: "[Your Logo Here] CMS"});
  });
  return router;
})();