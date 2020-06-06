const router = require('express').Router();
const visitsCtrl = require('../controllers/visits');
const badgesCtrl = require('../controllers/badges');

router.get('/', isLoggedIn, visitsCtrl.index);
router.get('/new', isLoggedIn, visitsCtrl.new);
router.get('/:id', isLoggedIn, visitsCtrl.show);
router.get('/:id/edit', isLoggedIn, visitsCtrl.edit);
router.put('/:id', isLoggedIn, visitsCtrl.update);
router.post('/', isLoggedIn, visitsCtrl.create);
router.post('/:id/badge', isLoggedIn, badgesCtrl.create); // following user centric CRUD guide, URL endpoint should be visits/:id/badges, so cannot put in badges router
router.delete('/:id', isLoggedIn, visitsCtrl.delete);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/google');
    }
}

module.exports = router;