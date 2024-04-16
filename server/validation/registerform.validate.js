

const jwt = require('jsonwebtoken')
require('bcryptjs');

const registerformValidation = async(req, res, next)=>{
    console.log(req.body);
    if(!req.body){
        return res.json({
            status: 401,
            msg:"no body found"
        });
    }
    if(!req.body.name){
        return res.json({
            status: 401,
            msg:"no name found"
        });
    }
    if(!req.body.email){
        return res.json({
            status: 401,
            msg:"no email found"
        });
    }
    if(!req.body.password){
        return res.json({
            status: 401,
            msg:"no password found"
        });
    }
    if(!req.body.mobile){
        return res.json({
            status: 401,
            msg:"no mobile found"
        });
    }

    if(!(req.body.mobile.length===10)){
        return res.json({
            status: 401,
            msg:"Invalid mobile number"
        })
    }


    next();
}

module.exports = registerformValidation;