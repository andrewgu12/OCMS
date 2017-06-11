"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Check authentication on the page
exports.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated())
        next();
    else
        res.redirect("/");
};
