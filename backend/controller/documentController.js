const {documentService}=require('../service/documentService')
const document=async(req,res)=>{
 try {
    const doc=await documentService();
    return res.status(200).json(doc)
 } catch (error) {
    res.status(402).json({msg:"server error",
        message:error.message
    })
    
 }
};
module.exports={document}