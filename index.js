const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const express = require('express')
const cors = require('cors')

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(cors())

const {getRestaurants,postRestaurants} =require('./controllers/mongoDB-ctrl')
const restaurants = [
    {
        id: 1,
        name: "Restaurant test1",
        imgUrl: "imgUrl test1",
        city: "city test1",
        rating: "rating test1"
    },
    {
        id: 2,
        name: "Restaurant test2",
        imgUrl: "imgUrl test2",
        city: "city test2",
        rating: "rating test2"
    },
    {
        id: 3,
        name: "Restaurant test3",
        imgUrl: "imgUrl test3",
        city: "city test3",
        rating: "rating test3"
    },
]


const port = process.env.PORT || 5050


app.get('/api/restaurants', (req, res) => {
    res.json({data:restaurants})
    getRestaurants()
    .then((data) => {res.json(data)})
    .catch(err => sendErrorOutput(err, res))
})
app.post('/api/restaurants', (req, res) => {
   
    postRestaurants()
    .then((data) => {res.json(restaurant)})
    .catch(err => sendErrorOutput(err, res))
})



app.listen(port, () => console.log('conncted to mongoDB on port  '+ port))