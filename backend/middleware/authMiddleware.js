
const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const authentcate=req.headers.authorization;
    if (!authentcate|| authentcate.startWith('Bearer')){
        return res.status(402).json({msg:"Invalid Authoriztion so Try to Login Eyob"});
        
    }
     const token=authentcate.split(" ")[1];
     console.log("Authorization:", req.headers.authorization);
    try {
       const{user_id,username,email,role}=jwt.verfiy(token,process.env.SECURT_KEY);
        req.user={user_id,username,email,role};
    } catch (error) {
        return res.status(402).json({msg:"invalid Authoriztion from catch block so Try to Login Eyob"})
        
        
    }
};
module.exports=authMiddleware