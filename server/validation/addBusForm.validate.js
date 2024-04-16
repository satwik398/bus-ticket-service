const busFormValidation = (req, res, next)=>{
    if(!req.body.name){
        return res.json({
            status: 401,
            msg:"name not found"
        });
    }
    if(!req.body.price){
        return res.json({
            status: 401,
            msg:"price not found"
        });
    }
    if(!req.body.source){
        return res.json({
            status: 401,
            msg:"source not found"
        });
    }
    if(!req.body.destination){
        return res.json({
            status: 401,
            msg:"destination not found"
        });
    }
    if(!req.body.startTime){
        return res.json({
            status: 401,
            msg:"start time not found"
        });
    }
    if(!req.body.endTime){
        return res.json({
            status: 401,
            msg:"ent time not found"
        });
    }
    if(!req.body.displayImage){
        return res.json({
            status: 401,
            msg:"display image not found"
        });
    }

    next();
}

module.exports = busFormValidation;