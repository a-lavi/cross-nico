const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    comment: String,
    author: String,
    date: String
})

module.exports = mongoose.model('Comments', commentsSchema);