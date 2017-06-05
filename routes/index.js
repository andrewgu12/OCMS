"use strict";
// import express library
const express = require("express");
const router = express.Router();
router.get("/", (req, res, next) => {
    res.render("index", { title: "[Your Logo Here] CMS" });
});
module.exports = router;
