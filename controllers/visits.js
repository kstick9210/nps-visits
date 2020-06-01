const Visit = require ('../models/visit');

module.exports = {
    index
};

function index(req, res, next) {
    res.render('visits', {title: 'Your visits', user: req.user });
}