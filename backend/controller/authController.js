const {userService,loginService}=require('../service/authService') 
 const createUser=async(req,res)=>{

   try {
        const{username,email,password,role}=req.body;
        
  const result= await userService(username,email,password,role); 
    
     res.status(200).json({
        message:"Inserted is Successfull Eyob",
         success:true,
         userid:result.userid
        
    });
    } catch (error) {
        console.log(error)
          if (error.message=="Email Aleardy Exist") {
            res.status(400).json({message:message.error});
            
          }
     res.status(500).json({message:"server Error",
                   error:error.message
     });

    }}
    ////////////////login controller/////////////////////////
 const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const result = await loginService(email, password);

        res.status(200).json({
            msg: "Login successful",
            success: true,
            data: result
        });

    } catch (error) {

        console.log(error);

        res.status(401).json({
            message: error.message,
            success: false
        });
    }
};
module.exports={createUser,login};