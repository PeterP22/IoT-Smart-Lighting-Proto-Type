const mongoose = require('mongoose');
const Light = require('./models/Light');

const MONGO_URI = 'mongodb://localhost:27017/smart-lighting';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

Light.find().sort({ _id: -1 }).limit(50).then(lights => {
    const idsToDelete = lights.map(light => light._id);

    Light.deleteMany({ _id: { $in: idsToDelete } })
        .then(result => {
            console.log(`Deleted ${result.deletedCount} lights.`);
            mongoose.connection.close();
        })
        .catch(error => {
            console.error("Error during deletion:", error.message);
            mongoose.connection.close();
        });
});
