const mongoose = require('mongoose');
require('dotenv').config();


const MONGO_URL =  process.env.ATLASDB_URL;
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
