
const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    const authentcate=req.headers.authorization;
    if (!authentcate || !authentcate.startsWith('Bearer')) {
        return res.status(401).json({
            msg: "Invalid Authorization"
        });
    }
     const token=authentcate.split(" ")[1];
     console.log("Authorization:", req.headers.authorization);
    try {
       const{user_id,username,email,role}=jwt.verify(token,process.env.SECURT_KEY);
        req.user={user_id,username,email,role};
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"invalid Authoriztion from catch block so Try to Login Eyob",
            message:error.message
        })
        
        
    }
};
module.exports=authMiddleware
/*
you are act as college assistance and fix the folowing error why it happen ,when it,how it fix i am create create user account it contain username,email,password and but in jwt and sign is username,user_id,email,role but the error is say "Column 'role' cannot be null" but on browoser display user with role user is {username: "afomia", email: "afomia@gmail.com", role: "student"}

email: "afomia@gmail.com"

role: "student"

username: "afomia"{"username":"afomia","email":"afomia@gmail.com","role":"student"} and token also display in create account from database table role contain student,registrar and dean student is defualt hint in create accunt role is not selected but come form jwt and sign but it is not work so how to implement this ,how to fix this type of error or mistake not only this user_id is forign key   to student table and during student profile like fname,lname so on in this time user_id is not null but in side auththentcationmiddleware and login sign is exact no mistake



*/