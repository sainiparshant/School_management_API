const mongoose = require('./database');

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
