const Visit = require ('../models/visit');

module.exports = {
    index,
    new: newVisit
};

function index(req, res) {
    res.render('visits', {title: 'Your visits', user: req.user });
}

function newVisit(req, res) {
    res.render('new', {title: 'Add New Visit', user: req.user});
}