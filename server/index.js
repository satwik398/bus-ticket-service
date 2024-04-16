require("./db/conn");

const cors = require("cors");
const express = require('express');
const PORT = require('./config/server.config');
const router = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true}));

app.use('/', router);




app.listen(PORT , ()=>{
    console.log(`server running on port ${PORT}`);
});