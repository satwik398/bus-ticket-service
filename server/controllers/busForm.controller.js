const Bus = require('../models/bus.model');



const allBusController = async (req, res)=>{
    try {
        const source = req.query.source;
        const destination = req.query.destination;
        console.log(source);
        const data = await Bus.find({source, destination});
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const busWIthIdController = async (req, res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        const data = await Bus.findOne({_id: id});
        res.json(data);
    } catch (error) {
        console.log(error);
    }
}

const busController = async (req, res)=>{
    try{
        const name = req.body.name;
        const source = req.body.source;
        const destination = req.body.destination;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const price = req.body.price;
        const displayImage = req.body.displayImage;
        const seats = req.body.seats;

        const newBus = new Bus({
            name: name,
            source: source,
            destination: destination,
            startTime: startTime,
            endTime: endTime,
            price: price,
            displayImage: displayImage,
            seats: seats
        });

        await newBus.save();
        return res.json({
            status: 200,
            newBus
        });
    }
    catch(error){
        console.log(error);
        return res.json({
            status:500,
            msg:"INTERNAL ERROR"
        });
    }
}

module.exports = {busController, allBusController, busWIthIdController};