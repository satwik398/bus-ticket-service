const express = require('express');
const busFormValidation = require('../validation/addBusForm.validate');
const {busController} = require('../controllers/busForm.controller');
const {allBusController} = require("../controllers/busForm.controller");
const {busWIthIdController} = require("../controllers/busForm.controller");

const busRouter = express.Router();

busRouter.get('/:id', busWIthIdController);

busRouter.get('/', allBusController);

busRouter.post('/', busFormValidation, busController);

module.exports = busRouter;