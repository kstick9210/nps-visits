const router = require('express').Router();
const visitsCtrl = require('../controllers/visits');

router.get('/', isLoggedIn, visitsCtrl.index);
router.get('/new', isLoggedIn, visitsCtrl.new);
router.get('/:id', isLoggedIn, visitsCtrl.show);
router.get('/:id/edit', isLoggedIn, visitsCtrl.edit);
router.put('/:id', isLoggedIn, visitsCtrl.update);
router.post('/', isLoggedIn, visitsCtrl.create);
router.delete('/:id', isLoggedIn, visitsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;