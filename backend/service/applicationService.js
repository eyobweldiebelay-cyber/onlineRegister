const db = require('../db/dbConfig');


// =====================================================
// STUDENT: CREATE APPLICATION
// =====================================================

const createService = async (
    userId,
    programId,
    academicYear
) => {

    const [student] = await db.query(
        `SELECT student_id
         FROM students
         WHERE user_id = ?`,
        [userId]
    );

    if (student.length === 0) {
        throw new Error("Student profile not found");
    }

    const studentId = student[0].student_id;

    const [result] = await db.query(
        `INSERT INTO applications
        (student_id, program_id, academic_year)
        VALUES (?, ?, ?)`,
        [
            studentId,
            programId,
            academicYear
        ]
    );

    return result;
};


// =====================================================
// STUDENT: GET MY APPLICATION
// =====================================================

const getMyApplication = async (userId) => {

    const [student] = await db.query(
        `SELECT student_id
         FROM students
         WHERE user_id = ?`,
        [userId]
    );

    if (student.length === 0) {
        throw new Error("Student profile not found");
    }

    const studentId = student[0].student_id;

    const [result] = await db.query(
        `SELECT
            a.application_id,
            a.academic_year,
            a.status,
            a.submitted_at,
            p.program_id,
            p.program_name
        FROM applications a
        JOIN programs p
            ON a.program_id = p.program_id
        WHERE a.student_id = ?
        ORDER BY a.created_at DESC`,
        [studentId]
    );

    return result;
};


// =====================================================
// STUDENT: SUBMIT APPLICATION
// =====================================================

const submitApplication = async (
    applicationId,
    userId
) => {

    const [student] = await db.query(
        `SELECT student_id
         FROM students
         WHERE user_id = ?`,
        [userId]
    );

    if (student.length === 0) {
        throw new Error("Student profile not found");
    }

    const studentId = student[0].student_id;

    const [result] = await db.query(
        `UPDATE applications
         SET
            status = 'pending',
            submitted_at = NOW()
         WHERE application_id = ?
         AND student_id = ?
         AND status = 'draft'`,
        [
            applicationId,
            studentId
        ]
    );

    return result;
};


// =====================================================
// REGISTRAR: GET ALL APPLICATIONS
// =====================================================

const getAllApplications = async () => {

    const [result] = await db.query(
        `SELECT
            a.application_id,
            a.student_id,
            a.program_id,
            a.academic_year,
            a.status,
            a.submitted_at,
            a.created_at,

            s.first_name,
            s.middle_name,
            s.last_name,
            s.phone,
            s.sex,
            s.date_of_birth,
            s.national_id,
            s.address,

            u.user_id,
            u.username,
            u.email,

            p.program_name

        FROM applications a

        JOIN students s
            ON a.student_id = s.student_id

        JOIN users u
            ON s.user_id = u.user_id

        JOIN programs p
            ON a.program_id = p.program_id


        ORDER BY a.submitted_at DESC`
    );

    return result;
};


// =====================================================
// REGISTRAR: GET ONE APPLICATION
// =====================================================

const getApplicationById = async (applicationId) => {

    const [application] = await db.query(
        `SELECT
            a.application_id,
            a.student_id,
            a.program_id,
            a.academic_year,
            a.status,
            a.submitted_at,
            a.reviewed_at,
            a.reviewed_by,
            a.created_at,

            s.first_name,
            s.middle_name,
            s.last_name,
            s.phone,
            s.sex,
            s.date_of_birth,
            s.national_id,
            s.address,
            s.student_status,

            u.user_id,
            u.username,
            u.email,

            p.program_name

        FROM applications a

        JOIN students s
            ON a.student_id = s.student_id

        JOIN users u
            ON s.user_id = u.user_id

        JOIN programs p
            ON a.program_id = p.program_id

        WHERE a.application_id = ?`,
        [applicationId]
    );

    if (application.length === 0) {
        return null;
    }


    // Get student's documents
    const [documents] = await db.query(
        `SELECT
            document_id,
            document_type,
            file_name,
            file_path,
            file_type,
            file_size,
            uploaded_at
         FROM documents
         WHERE application_id = ?
         ORDER BY uploaded_at DESC`,
        [applicationId]
    );


    return {
        ...application[0],
        documents
    };
};


// =====================================================
// REGISTRAR: APPROVE
// =====================================================

const approveApplication = async (
    applicationId,
    registrarId
) => {

    const [result] = await db.query(
        `UPDATE applications
         SET
            status = 'approved',
            reviewed_at = NOW(),
            reviewed_by = ?
         WHERE application_id = ?
         AND status = 'pending'`,
        [
            registrarId,
            applicationId
        ]
    );

    return result;
};


// =====================================================
// REGISTRAR: REJECT
// =====================================================

const rejectApplication = async (
    applicationId,
    registrarId
) => {

    const [result] = await db.query(
        `UPDATE applications
         SET
            status = 'rejected',
            reviewed_at = NOW(),
            reviewed_by = ?
         WHERE application_id = ?
         AND status = 'pending'`,
        [
            registrarId,
            applicationId
        ]
    );

    return result;
};


// =====================================================
// REGISTRAR: SEND COMMENT
// =====================================================

const sendApplicationComment = async (
    applicationId,
    registrarId,
    message
) => {

    // Find the student user_id
    const [application] = await db.query(
        `SELECT
            s.user_id
         FROM applications a
         JOIN students s
            ON a.student_id = s.student_id
         WHERE a.application_id = ?`,
        [applicationId]
    );

    if (application.length === 0) {
        return {
            affectedRows: 0
        };
    }

    const studentUserId =
        application[0].user_id;


    // Insert comment
    const [result] = await db.query(
        `INSERT INTO comments
        (
            sender_id,
            receiver_id,
            message
        )
        VALUES (?, ?, ?)`,
        [
            registrarId,
            studentUserId,
            message.trim()
        ]
    );

    return result;
};


module.exports = {
    createService,
    getMyApplication,
    submitApplication,

    getAllApplications,
    getApplicationById,
    approveApplication,
    rejectApplication,
    sendApplicationComment
};