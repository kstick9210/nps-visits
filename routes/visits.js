const router = require('express').Router();
const visitsCtrl = require('../controllers/visits');
const request = require('request');

const key = process.env.NPS_KEY;

router.get('/', isLoggedIn, visitsCtrl.index); 

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;