require('cookie-parser');
require('dotenv').config();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async (req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const mobile = req.body.mobile;

        const user = await User.findOne({email});
        if(user){
            return res.json({
                status: 400,
                msg:"user already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const newUser = new User({
            email:email,
            password:hashedPassword,
            name:name,
            mobile:mobile
        });

        await newUser.save();

        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET);
        res.cookie("token", token);

        return res.json({
            status:200,
            newUser
        });


    } catch (error) {
        console.log(error);
        res.json({
            status:500,
            msg:"Internal Error"
        });
    }
};


module.exports = registerController;