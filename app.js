require("dotenv/config");
require("./config/db");
require("./helpers/hbsHelpers");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const projectsRouter = require("./routes/projects");
const technologyRouter = require("./routes/technology");
const hbs = require("hbs");
const User = require("./models/User");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "/views/partials"));

/**
 * Declare hbs as default engine, meaning that when you render your views
 * res.render("myView.hbs")
 * you can ommit the extension
 * => res.render("myView")
 * Note: (its just for comfort)
 */
app.set("view engine", "hbs");

/**
 *  Middleware that logs incoming requests in the console
 */
app.use(logger("dev"));

/**
 * Middleware responsible of reading headers Content-Type: application/x-www-form-urlencoded
 * and giving access to the data sent by an ajax request @req.body
 */
app.use(express.json());

/**
 * Middleware responsible of reading headers Content-Type: application/x-www-form-urlencoded (sent by a form)
 * and giving access to the data sent by an ajax request @req.body
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Middleware responsible of reading cookies in a request and giving access
 * to the cookies @req.cookies
 */
app.use(cookieParser());

/**
 * Middleware responsible of serving static assets to the browser when requested
 */
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    // cookie: { secure: true },
  })
);

app.use((req, res, next) => {
  if (req.session.currentUser) {
    User.findById(req.session.currentUser._id)
      .then((userFromDb) => {
        res.locals.currentUser = userFromDb;
        res.locals.isLoggedIn = true;
        next();
        // res.locals.isAdmin = userFromDB.isAdmin
      })
      .catch((error) => {
        next(error);
      });
  } else {
    res.locals.currentUser = undefined;
    res.locals.isLoggedIn = false;
    next();
  }
});

/**
 * ROUTES
 * app.use("/prefix",router); => All routes in the router are PREFIXED with "/prefix"

 */

app.use("/", indexRouter);
app.use("/auth", require("./routes/auth"));
app.use("/users", usersRouter);
app.use("/projects", projectsRouter);
app.use("/technology", technologyRouter);

/** ERROR HANDLING MIDDLEWARES
 * https://expressjs.com/en/guide/error-handling.html
 */

/**
 * If you end up in this middleware, it means that no routes in any router
 * match the requests.url
 *
 * eg: GET http://localhost:5000/FOOOOOOOOOOOOOOOOOOOOOOOO
 *  if no route GET route "/FOOOOOOOOOOOOOOOOOOOOOOOO" is declared
 * in any router, you will end up here, it will create a 404 error
 * and call the next() function with a parameter, making the request
 * end up in the error handling middleware
 */
app.use(function (req, res, next) {
  next(createError(404));
});

/**
 * Error handling middleware
 * As soon as a middleware calls the next() function with a parameter
 * you will end up in this middleware
 * eg: next("foo")
 * will make you end up in this middleware and the err parameter will be equald to "foo"
 *
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
