const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    source:{
        type: String,
        required: true,
    },
    destination:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    startTime:{
        type:String,
        required: true
    },
    endTime:{
        type:String,
        required:true
    },
    images:[String],
    displayImage:{
        type:String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    }
});

const busModel = new mongoose.model('bus', busSchema);

module.exports = busModel;