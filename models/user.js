const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    parkVisits: [{
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }],
    badgeCollection: [{
        type: Schema.Types.ObjectId,
        ref: 'JrRangerBadge'
    }],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);