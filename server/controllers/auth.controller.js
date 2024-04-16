require('dotenv').config();

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Bus = require("../models/bus.model");

const authController = async(req, res, next)=>{
    try {
        if(!req.cookies){
            return res.json({
                status:402,
                msg:"Unauthorized"
            });
        }
        const token = req.cookies.token;
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: verifyUser.id});

        const rideIds = user.pastRides.map(({rideId})=>rideId);

        const RidesTaken = await Bus.find({_id : {$in : rideIds}});

        return res.json({
            status:200,
            user,
            RidesTaken
        });

    } catch (error) {
        console.log(error);
        return res.json({
            status: 500,
            msg:"INTERNAL ERROR"
        });
    }
}

module.exports = authController;