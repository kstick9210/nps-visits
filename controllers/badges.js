const User = require('../models/user');
const Visit = require('../models/visit');

module.exports = {
    index
};

function index(req, res) {
    User.findById(req.user).populate('parkVisits').exec(function(err, user) {
        res.render('badges/index', {title: `${user.name}'s Junior Ranger Badges`, user});
    })
}