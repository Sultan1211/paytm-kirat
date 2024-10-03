
const express = require("express");
const router = express.router();

router.post("/signin", function(res,req){
    const userName = req.body.userName;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;



})

module.exports = router;


