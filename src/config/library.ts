/**
 * Contains a collection of unrelated functions to import into any file.
 */
import * as express from "express";

// Check authentication on the page
export const checkAuthentication = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.isAuthenticated()) 
    next();
  else 
    res.redirect("/");
};
