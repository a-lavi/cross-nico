const mongoose = require('mongoose')
const Restaurant = require('../model/restaurant')
const Comments = require('../model/comments')


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
        rating: dbRestaurant.rating,
        tags: dbRestaurant.tags ,
        latitude : dbRestaurant.latitude,
    longitude: dbRestaurant.longitude      
    }
}
function _makedbComments(dbComments) {
    return {
        id: dbComments._id,
        comment: dbComments.comment,
        author: dbComments.author,
        date: dbComments.date,
        restaurant_id: dbComments.restaurant_id
    }
}

async function getRestaurants() {
    const dbRestaurants = await Restaurant.find({})
    return dbRestaurants.map((dbRestaurant) => _makedbRestaurants(dbRestaurant))
}

async function getOneRestaurant(id) {
    const comments = await Comments.find({restaurant_id:id})
    const oneRestaurant = await Restaurant.findById(id)
const comm= await comments.map((dbComments) => _makedbComments(dbComments))
console.log(comm)
const one = _makedbRestaurants(oneRestaurant)
    return {...one, comm} 
  
}

async function getComments() {
    const dbComments = await Comments.find({})
    return dbComments.map((dbComments) => _makedbComments(dbComments))
}


async function postRestaurants(update) {
    const postRestaurants = await Restaurant.create({
        id: update._id,
        name: update.name,
        imgUrl: update.imgUrl,
        city: update.city,
        rating: update.rating,
        tags: update.tags,
        latitude : update.latitude,
    longitude: update.longitude 
    })
    return _makedbRestaurants(postRestaurants)
}

async function postComment(req) {
    const update= req.body
    const restId= req.params.id
    console.log(restId)
    const postComments = await Comments.create({
        comment: update.comment,
        author: update.author,
        /* date: update.date, */
        restaurant_id: restId
    })
    return _makedbComments(postComments)
}

async function putRestaurant(id, name, imgUrl, city, rating, tags,latitude,longitude) {
    const updateRestaurant = await Restaurant.findByIdAndUpdate(
      { _id: id },
      {
        name: name,
        imgUrl: imgUrl,
        city: city,
        rating: rating,
        tags: tags,
        latitude : latitude,
        longitude: longitude 
      }, {new : true}
    );
  
    return _makedbRestaurants(updateRestaurant);
  }



module.exports={
    getRestaurants,
    getOneRestaurant,
    postRestaurants,
    getComments,
    postComment,putRestaurant
}