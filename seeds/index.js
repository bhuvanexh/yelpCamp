const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCampDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random100 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 50);
        const camp = new Campground(
            {
                author: '63c7cce3afc04d46fbe39782',
                location: `${cities[random100].city}, ${cities[random100].state}`,
                title: `${sample(descriptors)} ${sample(places)} `,
                geometry: {
                    type: 'Point',
                    coordinates: [
                        cities[random100].longitude,
                        cities[random100].latitude
                    ]
                },
                images: {
                    url: 'https://res.cloudinary.com/dhjw3tyz7/image/upload/v1674105746/YelpCamp/fo2tdxfxncuwp68y0gg8.jpg',
                    filename: 'YelpCamp/fo2tdxfxncuwp68y0gg8'
                }
                ,
                description: 'yada yada it was a nice place no cap',
                price
            })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})