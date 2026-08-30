const express=require('express')
const router=express.Router()
//application controller
const applicationController=require('../controller/applicationController')
//create route
router.post("/application",applicationController.application)
router.get("/getapplication",applicationController.getMyApplicationController);
router.get("/:id/submit",applicationController.submitApplicationController)
//module export
module.exports=router