const Location = require('../models/Location');

exports.createLocation = async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;

        if (!name || !latitude || !longitude) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const location = new Location({
            name,
            latitude,
            longitude
        });

        const savedLocation = await location.save();
        res.status(201).json(savedLocation);
    } catch (error) {
        console.error('Error saving location:', error); // Log the error details
        res.status(500).json({ message: 'Server error', error });
    }
};
