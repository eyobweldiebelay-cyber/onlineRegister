const db=require('../db/dbConfig')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userService=async(username,email,password,role)=>{

  //check email 
   const[emailExist]=await db.query(`SELECT * FROM users WHERE email=?`,[email]);
   if (emailExist.length > 0) {
       throw new Error("Email aleardy exist");
      
   }
   //hash password
   const hashPassord=await bcrypt.hash(password,10);
   
      const [result]= await db.query(`INSERT INTO users (username,email,password,role) Values(?,?,?,?)`,[username,email,hashPassord,role]); 
      if (result.affectedRows === 0) {
        throw new Error("Failed to create user");
        console.log(result);
      }
      return result;
   };
   //////////////////login and auth
   const loginService = async (email, password) => {

    // 1. Find user by email
    const [result] = await db.query(
        `SELECT user_id, username, email,password,role
         FROM users
         WHERE email = ?`,
        [email]
    );

    // 2. Check if user exists
    if (result.length === 0) {
        throw new Error("User not found");
    }

    // 3. Get the user
    const user = result[0];

    // 4. Compare entered password with database password
    const isMatch = await bcrypt.compare( password,user.password
    );

    // 5. Password incorrect
    if (!isMatch) {
        throw new Error("Invalid password");
    }

    // 6. Create JWT
    const token = jwt.sign(
        {
            userid: user.userid,
            username: user.username,
            email: user.email,
            role:user.role
        },
        process.env.SECURT_KEY,
        {
            expiresIn: '1h'
        }
    );

    // 7. Send result back to controller
    return {
        message: "Login successful",
        token: token,
        user: {
            userid: user.userid,
            username: user.username,
            email: user.email,
            role:user.role
        }
    };
}

module.exports={userService,loginService};