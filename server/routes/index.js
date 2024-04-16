const express = require('express');
const cookieParser = require("cookie-parser");
const api = require('./api');

const router = express.Router();

router.use(cookieParser());
router.use("/api", api);


router.get('/', (req, res)=>{
    return res.json({
        msg: "Home route called"
    });
});

module.exports = router;