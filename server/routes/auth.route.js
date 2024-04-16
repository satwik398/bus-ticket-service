const express = require('express');
const registerformValidation = require('../validation/registerform.validate');
const loginformValidation = require('../validation/loginform.validate');
const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');

const authRouter = express.Router();

// /api/auth/login
authRouter.post('/login', loginformValidation, loginController);

// /api/auth/register
authRouter.post('/register', registerformValidation, registerController);

module.exports = authRouter;
