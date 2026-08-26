const express=require('express')
const router=express.Router()
//require auth controller
const programController=require('../controller/programController')
//create route API
router.get("/program",programController.program);
//export router
module.exports=router