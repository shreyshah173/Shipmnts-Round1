const mongoose = require('mongoose');

const trafficUpdateSchema = new mongoose.Schema({
    road_id: {
        type: String,
        ref: 'Road',
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    traffic_condition: {
        type: String,
        required: true
    }
});

const TrafficUpdate = mongoose.model('TrafficUpdate', trafficUpdateSchema);

module.exports = TrafficUpdate;
