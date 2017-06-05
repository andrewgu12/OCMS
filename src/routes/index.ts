// import express library
import * as express from "express";
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render("index", {title: "[Your Logo Here] CMS"});
});

export = router;