const User = require('../models/user');
const Visit = require('../models/visit');

module.exports = {
    index,
    new: newVisit,
    create,
    show,
    delete: deleteVisit,
    edit,
    update
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
            user: req.user
        });
    });
}

function deleteVisit(req, res) {
    User.findOne({'parkVisits': {'_id': req.params.id}}, function(err, result) { // find user who created the visit
        console.log('User.findOne result: ', result._id); //! console log
        if (!result._id.equals(req.user._id)) return res.redirect(`/visits/${req.params.id}`); // return to show view if current user != owner of visit
        Visit.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                console.log('error: ', err); //! console log
                res.redirect(`/visits/${req.params.id}`);
            }
        });
        res.redirect('/visits');
    })
}

function edit(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        console.log(visit); //! console log
        res.render('edit', {
            title: `Edit Visit to ${visit.parkName}`,
            visit,
            user: req.user,
            parkName: Visit.schema.path('parkName').enumValues
        });
    });
}

function update(req, res) {
    User.findOne({'parkVisits': {'_id': req.params.id}}, function(err, result) {
        console.log('User.findOne result: ', result._id); //! console log
        if (!result._id.equals(req.user._id)) return res.redirect(`/visits/${req.params.id}`);
        const d = req.body.date;
        req.body.date = `${d.substr(5, 2)}-${d.substr(8, 2)}-${d.substr(0, 4)}`;
        user = req.user;
        Visit.findById(req.params.id, function(err, visit) {
            visit.date = req.body.date;
            visit.save(function(err) {
                if (err) {
                    console.log('error: ', err); //! console log
                    res.redirect(`/visits/${req.params.id}/edit`);
                }
                res.redirect(`/visits/${req.params.id}`);
            })
        })
    })
}