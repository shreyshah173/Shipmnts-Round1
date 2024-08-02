const TrafficUpdate = require('../models/TrafficUpdate');

exports.createTrafficUpdate = async (req, res) => {
    try {
        const { road_id, timestamp, traffic_condition } = req.body;

        const newTrafficUpdate = new TrafficUpdate({
            road_id,
            timestamp,
            traffic_condition
        });

        await newTrafficUpdate.save();

        res.status(201).json(newTrafficUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

