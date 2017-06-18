// import required files
import * as express from "express";
import * as expressSession from "express-session";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as passport from "passport";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as connectMongo from "connect-mongo";
import * as configVals from "./config/connection";

const flash = require("connect-flash");

// routes
const baseRoutes = require("./routes/index");

// database connection
(mongoose as any).Promise = global.Promise;
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
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  const err  = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.locals.pretty = true;
  app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  app.locals.pretty = true;
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});


module.exports      = app;
