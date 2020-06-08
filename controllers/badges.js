const User = require('../models/user');
const Visit = require('../models/visit');
const JrRangerBadge = require('../models/badge');

module.exports = {
    index,
    create,
    delete: deleteBadge
};

function index(req, res) {
    req.user.populate('badgeCollection').execPopulate(function(err, user) {
        res.render('badges/index', {title: `${user.name}'s Junior Ranger Badges`, user});
    })
}

function create(req, res) {
    Visit.findById(req.params.id, function(err, visit) {
        const d = req.body.date;
        req.body.date = `${d.substr(5, 2)}-${d.substr(8, 2)}-${d.substr(0, 4)}`;
        req.body.parkName = visit.parkName;
        user = req.user;
        const badge = new JrRangerBadge(req.body);
        badge.save(function(err) {
            if (err) {
                return res.redirect(`/visits/${req.params.id}`);
            }
            visit.jrRangerBadge.push(badge);
            visit.save(function(err) {
                if (err) {
                    return res.redirect(`/visits/${req.params.id}`);
                }
                user.badgeCollection.push(badge);
                user.save(function(err) {
                    if (err) {
                        return res.redirect(`/visits/${req.params.id}`);
                    }
                })
            })
            res.redirect(`/visits/${req.params.id}`);
        })
    })
}

function deleteBadge(req, res) {
    User.findOne({'badgeCollection': {'_id': req.params.id}}, function(err, result) { // find user who created the badge
        if (!result._id.equals(req.user._id)) return res.redirect('/badges'); // return to index view if current user != owner of badge
        JrRangerBadge.findByIdAndRemove(req.params.id, function(err) {
            if (err) {
                res.redirect('/badges');
            }
        });
        res.redirect('/badges');
    })
}