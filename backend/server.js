const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const NodeCache = require('node-cache');

const Light = require('./models/Light');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/smart-lighting';

const myCache = new NodeCache({ stdTTL: 600 });

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.get('/api/lights', async (req, res) => {
    try {
        let cachedData = myCache.get("lightsData");
        if (!cachedData) {
            const lights = await Light.find().sort({ lightId: 1 }); // Sort by lightId in ascending order (1, 2, 3, ...)
            const lightsOnCount = await Light.countDocuments({ status: true });
            cachedData = { lights, lightsOnCount };
            myCache.set("lightsData", cachedData);
        }
        res.json(cachedData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/lights/:id', async (req, res) => {
    console.log("PUT Request received for ID:", req.params.id);
    console.log("Request Body:", req.body);

    try {
        const light = await Light.findOne({ lightId: Number(req.params.id) });
        if (!light) {
            console.log("Light not found for ID:", req.params.id);
            return res.status(404).send('Light not found');
        }

        console.log("Retrieved Light from DB:", light);
        if (typeof req.body.status !== 'undefined') {
            light.status = req.body.status;
        }
        if (typeof req.body.brightness !== 'undefined') {
            light.brightness = req.body.brightness;
        }
        await light.save();

        // Clear the cache since the data has been updated
        myCache.del("lightsData");

        console.log("Light updated and saved:", light);
        res.send(light);
    } catch (error) {
        console.error("Error during PUT operation:", error.message);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
