const express=require('express')
const router=express.Router()
//application controller
const applicationController=require('../controller/applicationController')
//create route
router.post("/application",applicationController.application)
//module export
module.exports=router