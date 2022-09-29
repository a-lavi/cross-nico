const mongoose = require('mongoose')
const  Restaurant = require('../model/restaurant')


const mongodbConnection = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}?retryWrites=true&w=majority`

mongoose.connect(mongodbConnection)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection failed'))


function _makedbRestaurants(dbRestaurant) {
    return {
        id: dbRestaurant._id,
        name: dbRestaurant.name,
        imgUrl: dbRestaurant.imgUrl,
        city: dbRestaurant.city,
        rating: dbRestaurant.rating
        
    }
}

async function getRestaurants() {
    const dbRestaurants = await Restaurant.find({})
    return dbRestaurants.map((dbRestaurant) => _makedbRestaurants(dbRestaurant))
}


async function postRestaurants(update) {
    const postRestaurants = await Restaurant.create({
        id: update._id,
        name: update.name,
        imgUrl: update.imgUrl,
        city: update.city,
        rating: update.rating
    })
    return _makedbRestaurants(postRestaurants)
}

module.exports={
    getRestaurants,postRestaurants
}