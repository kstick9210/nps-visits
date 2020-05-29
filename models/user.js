var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    parkVisits: [parkVisitSchema],
    badgeCollection: [badge_id],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);