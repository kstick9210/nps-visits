const User = require('../models/user');
const Visit = require('../models/visit');

module.exports = {
    index,
    new: newVisit,
    create,
    show,
    delete: deleteVisit
};

function index(req, res) {
    User.findById(req.user).populate('parkVisits').exec(function(err, user) {
        res.render('visits', {title: `${user.name}'s Visits`, user});
    })
}

function newVisit(req, res) {
    res.render('new', {
        title: 'Add New Visit', 
        user: req.user, 
        parkName: Visit.schema.path('parkName').enumValues});
}

function create(req, res) {
    const d = req.body.date;
    req.body.date = `${d.substr(5, 2)}-${d.substr(8, 2)}-${d.substr(0, 4)}`;
    user = req.user;
    const visit = new Visit(req.body);
    visit.save(function(err) {
        if (err) {
            console.log('error: ', err); //! console log
            return res.redirect('/visits/new');
        }
        user.parkVisits.push(visit);
        user.save(function(err) {
            if (err) {
                console.log('error: ', err); //! console log
                return res.redirect('/visits/new');
            }
        })
        res.redirect('/visits');
    })    
}

function show(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        res.render('show', { 
            title: `Visit to ${visit.parkName}`, 
            visit,
            user: req.user});
    });
}

function deleteVisit(req, res) {
    Visit.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log('error: ', err); //! console log
            res.redirect(`/visits/${req.params.id}`);
        }
    });
    res.redirect('/visits');
}