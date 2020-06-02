const router = require('express').Router();
const visitsCtrl = require('../controllers/visits');

router.get('/', isLoggedIn, visitsCtrl.index);
router.get('/new', isLoggedIn, visitsCtrl.new);
router.post('/', isLoggedIn, visitsCtrl.create);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;