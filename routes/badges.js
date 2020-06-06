const router = require('express').Router();
const badgesCtrl = require('../controllers/badges');

router.get('/', isLoggedIn, badgesCtrl.index);
router.delete('/:id', isLoggedIn, badgesCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;