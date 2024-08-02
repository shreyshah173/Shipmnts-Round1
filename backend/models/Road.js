const mongoose = require('mongoose');

const roadSchema = new mongoose.Schema({
    "start_location_id":{
        type:Number,
        required:true,
    },
    "end_location_id" :{
        type:Number,
        required:true,
    },
    "distance":{
        type:Number,
        required:true,
    },
    "traffic_condition":{
        type:String,
        required:true,
    }
});

const Road = mongoose.model('Road', roadSchema);

module.exports = Road;