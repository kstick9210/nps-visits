const router = require('express').Router();
const badgesCtrl = require('../controllers/badges');


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;