const express=require('express')
const router=express.Router()
//require auth controller
const authController=require('../controller/authController')
//create route API
router.post("/user",authController.createUser);
//export router
module.exports=router