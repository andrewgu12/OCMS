"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import required files
const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const helmet = require("helmet");
const mongoose = require("mongoose");
const connectMongo = require("connect-mongo");
const configVals = require("./config/connection");
const flash = require("connect-flash");
// routes
const baseRoutes = require("./routes/index");
// database connection
mongoose.connect(configVals.connectionURL);
// session storage
const MongoStore = connectMongo(expressSession);
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSession({
    secret: configVals.sessionSecret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Routes
app.use("/", baseRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.locals.pretty = true;
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    app.locals.pretty = true;
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});
module.exports = app;
