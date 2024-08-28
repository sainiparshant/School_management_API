const express = require('express');
const bodyParser = require('body-parser');
const School = require('./schema');
const app = express();

app.use(bodyParser.json());

// Add School API
app.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send('Invalid input data');
    }

    try {
        const newSchool = new School({ name, address, latitude, longitude });
        await newSchool.save();
        res.status(201).send('School added successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// List Schools API
app.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (typeof parseFloat(latitude) !== 'number' || typeof parseFloat(longitude) !== 'number') {
        return res.status(400).send('Invalid coordinates');
    }

    try {
        const schools = await School.find({});
        const userLatitude = parseFloat(latitude);
        const userLongitude = parseFloat(longitude);

        schools.sort((a, b) => {
            const distanceA = calculateDistance(userLatitude, userLongitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(userLatitude, userLongitude, b.latitude, b.longitude);
            return distanceA - distanceB;
        });

        res.status(200).json(schools);
    } catch (error) {
        res.status(500).send('Server error');
    }
});


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
