const User = require('../models/user');
const Visit = require('../models/visit');

module.exports = {
    index,
    new: newVisit,
    create
};

function index(req, res) {
    res.render('visits', {title: 'Your visits', user: req.user });
}

function newVisit(req, res) {
    res.render('new', {title: 'Add New Visit', user: req.user, parkName: Visit.schema.path('parkName').enumValues});
}

function create(req, res) {
    const d = req.body.date;
    req.body.date = `${d.substr(5, 2)}-${d.substr(8, 2)}-${d.substr(0, 4)}`;
    // const visit = new Visit(req.body);
    //! fix this
    Visit.create(req.body, function(err, visit) {
        console.log(req.body);
        res.redirect('/visits');
    })
}