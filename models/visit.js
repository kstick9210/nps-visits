const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    date: Date,
    jrRangerBadge: String, //! change to Schema once defined
    parkName: String,
    parkState: String,
    parkUrl: String
},{
    timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);