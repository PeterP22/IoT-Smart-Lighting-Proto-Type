const mongoose = require('mongoose');
const Light = require('./models/Light');

const MONGO_URI = 'mongodb://localhost:27017/smart-lighting';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Assuming 50 lights as default
const lights = Array.from({ length: 50 }, (_, i) => ({
    lightId: i + 1,
    status: false,
    brightness: 50
}));


Light.insertMany(lights)
  .then(() => {
      console.log('Database initialized with default light values.');
      mongoose.connection.close();
  })
  .catch(err => console.log(err));
