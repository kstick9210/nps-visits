var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    parkVisits: String, //! change to Schema once defined
    badgeCollection: String, //! change to Schema once defined
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);