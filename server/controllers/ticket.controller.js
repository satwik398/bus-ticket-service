const User = require("../models/user.model");
const Bus = require("../models/bus.model");
const mongoose = require("mongoose");


const ticketController = async (req, res)=>{
    if(!req.body.tickets || !req.body.userId || !req.body.busId){
        return res.json({
            status: 400,
            msg: "Invalid request"
        });
    }
    const userId = req.body.userId;
    const busId = req.body.busId;
    const tickets = req.body.tickets;

    try {
        // console.log(req.body);
        // const userId = req.body.userId;
        // const busId = req.body.busId;
        // const tickets = req.body.tickets;
        const user = await User.findOne({_id: userId});
        const bus = await Bus.findOne({_id: busId});
        console.log(bus);
        console.log(user);

        const remainingSeats = bus.seats - tickets;
        const updatedUser = await User.findOneAndUpdate({_id: userId}, {$push: {pastRides: {rideId: busId, date: ""}}}, {new: true});
        const updatedBus = await Bus.findOneAndUpdate({_id: busId}, {seats: remainingSeats}, {new: true});
        
        return res.json({
            msg:"ticket purchased"
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 400,
            msg: "some error occoured"
        })
    }


}

module.exports = ticketController;