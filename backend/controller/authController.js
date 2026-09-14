const {userService,loginService}=require('../service/authService') 
const createUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        // New accounts created from student registration are students
        const role = "student";

        const result = await userService(
            username,
            email,
            password,
            role
        );

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user_id: result.insertId
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            success: false,
            error: error.message
        });
    }
};
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