const {createService}=require('../service/authService') 
 const createUser=async(req,res)=>{

  
    try {
         const result=await createService();
       return res.status(200).json(result)
        
    } catch (error) {
       console.log(error)
        res.status(403).json({msg:"server error",
            message:error.message
        })
    }
};
module.exports={createUser};