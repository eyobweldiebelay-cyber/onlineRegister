const {programService}=require('../service/programService')
const program=async(req,res)=>{
 try {
    const pro=await programService();
    return res.status(200).json(pro)
 } catch (error) {
    res.status(402).json({msg:"server error",
        message:error.message
    })
    
 }
};
module.exports={program}