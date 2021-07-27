const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('signin-form')
})

/* router.post('/', async (req, res, next) => {

}) */

module.exports = router;