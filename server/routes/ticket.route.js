const express = require("express");
const ticketController = require("../controllers/ticket.controller");


const ticketRouter = express.Router();


ticketRouter.post("/", ticketController);

module.exports = ticketRouter;