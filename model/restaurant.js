const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: String,
    imgUrl: String,
    city: String,
    rating: Number
})

module.exports = mongoose.model('Restaurant', restaurantSchema);