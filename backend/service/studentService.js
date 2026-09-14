const db=require('../db/dbConfig')

const studentService=async(user_id,first_name,middle_name,last_name,phone,sex,date_of_birth,national_id,address,student_status)=>{
   const sql="INSERT INTO students( user_id,first_name,middle_name,last_name,phone,sex,date_of_birth,national_id,address,student_status) VALUES(?,?,?,?,?,?,?,?,?,?)";

   const [result]=await db.query(sql,[user_id,first_name,middle_name,last_name,phone,sex,date_of_birth,national_id,address,student_status]);

    if (result.affectedRows===0) {
        throw new Error("insertion is faild");
    }

    return result;
};
// ===============================
// ADD THIS FOR REGISTRAR Sudent 
// ===============================

const getAllStudents = async () => {

    const sql = `
        SELECT
            s.student_id,
            s.first_name,
            s.middle_name,
            s.last_name,
            s.phone,
            s.sex,
            s.date_of_birth,
            s.national_id,
            s.address,
            s.student_status,
            u.email,
            p.program_name
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
        LEFT JOIN applications a
            ON s.student_id = a.student_id
        LEFT JOIN programs p
            ON a.program_id = p.program_id
        ORDER BY s.created_at DESC
    `;

    const [result] = await db.query(sql);

    return result;
};


// Activate student
const activateStudent = async (student_id) => {

    const sql = `
        UPDATE students
        SET student_status = 'active'
        WHERE student_id = ?
    `;

    const [result] = await db.query(sql, [student_id]);

    return result;
};


// Deactivate student
const deactivateStudent = async (student_id) => {

    const sql = `
        UPDATE students
        SET student_status = 'inactive'
        WHERE student_id = ?
    `;

    const [result] = await db.query(sql, [student_id]);

    return result;
};
// ===============================
// ADD THIS FOR DEAN
// Get students for Dean
// ===============================

const getDeanStudentService = async () => {

    const sql = `
        SELECT
            s.student_id,
            s.first_name,
            s.middle_name,
            s.last_name,
            s.phone,
            s.sex,
            s.date_of_birth,
            s.national_id,
            s.address,
            s.student_status,
            u.email,
            p.program_name
        FROM students s
        JOIN users u
            ON s.user_id = u.user_id
        LEFT JOIN applications a
            ON s.student_id = a.student_id
        LEFT JOIN programs p
            ON a.program_id = p.program_id
        ORDER BY s.created_at DESC
    `;

    const [result] = await db.query(sql);

    return result;
};
module.exports={studentService, getAllStudents, activateStudent, deactivateStudent, getDeanStudentService};