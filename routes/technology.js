const express = require("express");
const router = express.Router();
const technology = require("../models/Technology.js");

router.get("/", (req, res, next) => {
  technology
    .find()
    .then((technologyfound) => {
      res.render("technology.hbs", { technology: technologyfound });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/:id/delete", (req, res, next) => {
  technology
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/technology");
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
