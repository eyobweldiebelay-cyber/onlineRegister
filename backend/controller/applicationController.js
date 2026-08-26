const {applicationService}=require('../service/applicationService')
const application=async(req,res)=>{
 try {
    const applicate=await applicationService();
    return res.status(200).json(applicate)
 } catch (error) {
    res.status(402).json({msg:"server error",
        message:error.message
    })
    
 }
};
module.exports={application}