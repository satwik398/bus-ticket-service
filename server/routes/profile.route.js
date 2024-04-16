const express = require('express');
const authController = require('../controllers/auth.controller');

const profileRouter = express.Router();


profileRouter.get('/pastrides', authController, (req, res)=>{
    res.json({
        msg:"past rides route called"
    });
});



profileRouter.get('/', authController);

module.exports = profileRouter;