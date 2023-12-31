const express = require("express");
const {Login} = require("../controller/Admin");
const router = express.Router();


router.post('/login',Login);



module.exports = router;