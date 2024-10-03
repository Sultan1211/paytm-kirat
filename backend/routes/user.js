
const express = require("express");
const zod = require("zod");
const User = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleware = require("../authMiddleware");
const inputSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async function(req,res){
    const {success} = inputSchema.safeParse(req.body)
    if(!success){
       return res.json({
            msg: "Invalid Inputs!!!"
        })

    }
    const isExists = await User.findOne({userName:req.body.userName});
    if(isExists){
       return res.json({
            msg: "user already exists"
        })
    }
   const user = await User.create({
         userName :req.body.userName,
         password :req.body.password,
         firstName:req.body.firstName,
         lastName :req.body.lastName
   });
   const token = jwt.sign({
    userId: user._id
   },JWT_SECRET);
   res.json({
    msg:"User created successfully",
    token: token
   })
})

// ----------------------------------------------------------------------------------------------------------
const updateObj = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/update",authMiddleware,async (req,res)=>{
    const {success} = updateObj.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"Invalid user"
        })
    }
    await User.updateOne({_id : req.userId},res.body);

    res.json({
        msg: "User updated successfully"
    })


})



module.exports = router;


