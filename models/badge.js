const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jrRangerBadgeSchema = new Schema({
    date: Date,
    parkName: String
})

module.exports = mongoose.model('JrRangerBadge', jrRangerBadgeSchema);