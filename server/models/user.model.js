const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String
    },
    pastRides:[{
        rideId: String,
        date: String
    }]
});

const userModel = new mongoose.model('user', userSchema);

module.exports = userModel;