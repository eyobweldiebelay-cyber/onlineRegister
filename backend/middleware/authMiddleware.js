
const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const authentcate=req.headers.authorization;
    if (!authentcate) {
        return res.status(402).json({msg:"invalid Authoriztion so Try to Login Eyob"});
        
    }
     const token=authentcate.split(" ")[1];
    try {
       const{user_id,username,email,role}=JsonWebTokenError.verfiy(token,process.env.SECURT_KEY);
        req.user={user_id,username,email,role};
    } catch (error) {
        return res.status(402).json({msg:"invalid Authoriztion from catch block so Try to Login Eyob"})
        
        
    }
};
module.exports=authMiddleware