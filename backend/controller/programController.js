const {programService}=require('../service/programService')
const program=async(req,res)=>{
 try {
     
    const pro=await programService();
    console.log(pro);
    return res.status(200).json({success:true,
                                  data:pro
    })
  
 } catch (error) {
   console.log(error)
    res.status(500).json({msg:"server error",success:false,
        message:error.message
    })
    
 }
};
module.exports={program}