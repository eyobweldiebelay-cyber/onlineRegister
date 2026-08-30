const express=require('express')
const router=express.Router()
//uploamiddleware
const upload = require("../middleware/uploadMiddleware");
//application controller
const documentController=require('../controller/documentController')
//create route
router.post("/upload",documentController.document)
//getdocument
router.get("/getupload",documentController.getMyDocuments);
//module export
//upload

module.exports=router