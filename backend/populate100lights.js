const mongoose = require('mongoose');
const Light = require('./models/Light');

const MONGO_URI = 'mongodb://localhost:27017/smart-lighting';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const populateDatabase = async () => {
    // Clear the existing lights, if you want to
    await Light.deleteMany({});

    const promises = [];
    for (let i = 0; i < 100; i++) {
        const light = new Light({
            lightId: i + 1,
            status: false,
            brightness: 55
        });
        promises.push(light.save());
    }

    await Promise.all(promises);
    console.log("100 lights added to the database!");
    mongoose.connection.close();
};

populateDatabase();
