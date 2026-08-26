const express=require('express')
const router=express.Router()
//application controller
const documentController=require('../controller/documentController')
//create route
router.post("/document",documentController.document)
//module export
module.exports=router