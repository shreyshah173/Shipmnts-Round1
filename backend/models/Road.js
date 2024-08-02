const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema({
    start_location_id: {
        type: mongoose.Schema.Types.ObjectId, // ObjectId reference to Location model
        ref: 'Location',
        required: true
    },
    end_location_id: {
        type: mongoose.Schema.Types.ObjectId, // ObjectId reference to Location model
        ref: 'Location',
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    traffic_condition: {
        type: String,
        enum: ['clear', 'moderate', 'heavy'],
        required: true
    }
});

const Road = mongoose.model('Road', roadSchema);

module.exports = Road;
