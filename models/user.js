const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    parkVisits: [{
        type: Schema.Types.ObjectId,
        ref: 'Visit'
    }],
    badgeCollection: String, //! change to Schema once defined
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);