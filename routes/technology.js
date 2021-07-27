const express = require('express');
const router = express.Router();
const technology = require("../models/Technology.js");



router.get ('/', (req, res, next) =>{
    technology.find().then(technologyfound => {res.render("technology.hbs", {technology: technologyfound,})}).catch((error) => {
        console.log(error)
    });
});



module.exports = router;