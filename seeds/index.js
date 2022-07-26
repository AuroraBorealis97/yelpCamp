const mongoose = require("mongoose"); //mongo
const campground = require("../models/campground");
const Campground = require('../models/campground'); //mongoose models
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); //mongo

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); //mongo check for erros
db.once('open', () => {
    console.log('Database connected');
}); //mongo check for errors

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:  `https://source.unsplash.com/random/300x300?camping,${i}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At rerum, esse incidunt consequatur voluptatem doloribus! Iusto provident doloremque, sunt odio cupiditate voluptatum ratione reprehenderit vitae accusamus necessitatibus officiis doloribus nam?',
            price
        }) 

        await camp.save();
    }
}




seedDB().then( () => {
    mongoose.connection.close();
});