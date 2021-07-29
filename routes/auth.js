const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const SALT = 10;

router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;

    if (!user.password || !user.userName) {
      res.render("auth/signup.hbs", {
        errorMessage: "Please provide an email and a password",
      });
      return;
    }

    const foundUser = await User.findOne({ userName: user.userName });

    if (foundUser) {
      res.render("auth/signup.hbs", {
        errorMessage: "Username taken",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(user.password, SALT);
    user.password = hashedPassword;

    const createdUser = await User.create(user);

    res.redirect("/signin");
  } catch (error) {
    next(error);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ userName: req.body.userName });

    if (!foundUser) {
      res.render("auth/signin.hbs", {
        errorMessage: "Bad credentials",
      });
      return;
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      foundUser.password
    );

    if (isValidPassword) {
      req.session.currentUser = {
        _id: foundUser._id,
      };

      res.redirect("/users/profile");
    } else {
      res.render("auth/signin.hbs", {
        errorMessage: "Bad credentials",
      });
      return;
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
