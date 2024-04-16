require('dotenv').config();
const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginController = async(req, res)=>{

    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({email});
        if(user){
            const auth = await bcrypt.compare(password, user.password);
            if(!auth){
                return res.json({
                    status:400,
                    msg:"Incorrect email or password"
                });
            }
            
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            res.cookie("token", token);
            return res.json({
                status: 200,
                user
            });
        }

        return res.json({
            status:400,
            msg:"User does not exist"
        });

    } catch (error) {
        console.log(error);
        return res.json({
            status:500,
            msg:"Internal Error"
        });
    }
};

module.exports = loginController;