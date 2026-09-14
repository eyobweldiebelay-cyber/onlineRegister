const { studentService,getAllStudents,deactivateStudent,activateStudent,getDeanStudentService} = require('../service/studentService');
const studentUser = async (req, res) => {
    try {

        // Get user_id from JWT
        const user_id = req.user.user_id;

        console.log("REQ.USER:", req.user);
        console.log("USER ID:", user_id);

        const {
            first_name,
            middle_name,
            last_name,
            date_of_birth,
            sex,
            nationalId,
            phone,
            address
        } = req.body;

        const student_status = "active";

        const result = await studentService(
            user_id,
            first_name,
            middle_name,
            last_name,
            phone,
            sex,
            date_of_birth,
            nationalId,
            address,
            student_status
        );

        return res.status(201).json({
            msg: "Student inserted successfully",
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Student controller error:", error);

        return res.status(500).json({
            msg: "Server error",
            success: false,
            error: error.message
        });
    }
};
// ===============================
// ADD THIS FOR REGISTRAR
// ===============================

// Get all students
const getStudents = async (req, res) => {

    try {

        const result = await getAllStudents();

        res.status(200).json({
            success: true,
            students: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            msg: "Failed to get students",
            error: error.message
        });
    }
};


// Activate student
const activate = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await activateStudent(id);

        res.status(200).json({
            success: true,
            msg: "Student activated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            msg: "Failed to activate student",
            error: error.message
        });
    }
};


// Deactivate student
const deactivate = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await deactivateStudent(id);

        res.status(200).json({
            success: true,
            msg: "Student deactivated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            msg: "Failed to deactivate student",
            error: error.message
        });
    }
};
// ===============================
// ADD THIS FOR DEAN
// Get all students for Dean
// ===============================

const getDeanStudentsController = async (req, res) => {

    try {

        const result = await getDeanStudentService();
        

        res.status(200).json({
            success: true,
            students: result
        });

    } catch (error) {


        console.error("Dean students error:", error);

        res.status(500).json({
            success: false,
            msg: "Failed to get Dean students",
            error: error.message
        });
    }
};

module.exports = { studentUser, getStudents, activate, deactivate,getDeanStudentsController };