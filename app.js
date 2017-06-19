"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import required files
var express = require("express");
var expressSession = require("express-session");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var helmet = require("helmet");
var mongoose = require("mongoose");
var connectMongo = require("connect-mongo");
var configVals = require("./config/connection");
var flash = require("connect-flash");
// routes
var baseRoutes = require("./routes/index");
// database connection
mongoose.Promise = global.Promise;
mongoose.connect(configVals.connectionURL);
// session storage
var MongoStore = connectMongo(expressSession);
var app = express();
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
    var err = new Error("Not Found");
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
