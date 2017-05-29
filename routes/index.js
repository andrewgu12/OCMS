"use strict";
// import express library
const express = require("express");
const router = express.Router();
module.exports = (() => {
    router.get("/", (req, res, next) => {
        res.render("index", { title: "Test" });
    });
    return router;
})();
