const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    comment: String,
    author: String,
    date: { type: Date, default: Date.now },
    restaurant_id: String
})

module.exports = mongoose.model('Comments', commentsSchema);