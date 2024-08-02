const Road = require('../models/Road');

exports.createRoad = async (req, res) => {
    try {
        const { start_location_id, end_location_id, distance, traffic_condition } = req.body;

        if (!start_location_id || !end_location_id || !distance || !traffic_condition){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const road = new Road({
            start_location_id, 
            end_location_id, 
            distance, 
            traffic_condition
        })

        const savedRoad = await road.save();
        res.status(201).json(savedRoad);
    } catch (error) {
        console.error('Error saving road:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};
