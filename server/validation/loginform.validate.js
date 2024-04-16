const loginformValidation = async(req, res, next)=>{
    // console.log(req.body);
    if(!req.body){
        return res.json({
            status: 401,
            msg:"no body found"
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
    next();
}

module.exports = loginformValidation;