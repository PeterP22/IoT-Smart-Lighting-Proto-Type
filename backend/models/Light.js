const mongoose = require('mongoose');

const LightSchema = new mongoose.Schema({
    lightId: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    brightness: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Light', LightSchema);