const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Project = require("../models/Project");
/* GET users listing. */
router.get("/profile", function (req, res, next) {
  res.render("users/profile.hbs");
});

router.get("/profile/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((userDoc) => {
      // if (!userDoc.isPublic) {
      //   // redirect somewhere
      // }

      Project.find({ contributors: userDoc._id })
        .populate("contributors")
        .then((projectDocs) => {
          res.render("users/profile.hbs", {
            user: userDoc,
            projects: projectDocs,
          });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
