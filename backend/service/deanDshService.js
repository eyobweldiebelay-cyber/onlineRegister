const db = require('../db/dbConfig');

const getDashboard = async () => {

    // -----------------------------
    // STUDENTS
    // -----------------------------

    const [studentResult] = await db.query(`
        SELECT
            COUNT(*) AS totalStudents,
            SUM(
                CASE
                    WHEN student_status = 'active' THEN 1
                    ELSE 0
                END
            ) AS activeStudents,
            SUM(
                CASE
                    WHEN student_status = 'inactive' THEN 1
                    ELSE 0
                END
            ) AS inactiveStudents
        FROM students
    `);


    // -----------------------------
    // APPLICATIONS
    // -----------------------------

    const [applicationResult] = await db.query(`
        SELECT
            COUNT(*) AS totalApplications,

            SUM(
                CASE
                    WHEN status = 'approved' THEN 1
                    ELSE 0
                END
            ) AS approvedApplications,

            SUM(
                CASE
                    WHEN status = 'pending' THEN 1
                    ELSE 0
                END
            ) AS pendingApplications,

            SUM(
                CASE
                    WHEN status = 'rejected' THEN 1
                    ELSE 0
                END
            ) AS rejectedApplications

        FROM applications
    `);


    // -----------------------------
    // PAYMENTS
    // -----------------------------

    const [paymentResult] = await db.query(`
        SELECT
            COUNT(*) AS totalPayments,

            SUM(
                CASE
                    WHEN payment_status = 'paid' THEN 1
                    ELSE 0
                END
            ) AS paidPayments,

            SUM(
                CASE
                    WHEN payment_status = 'pending' THEN 1
                    ELSE 0
                END
            ) AS pendingPayments

        FROM payments
    `);


    // -----------------------------
    // RECENT APPLICATIONS
    // -----------------------------

    const [recentApplications] = await db.query(`
        SELECT
            a.application_id,
            a.academic_year,
            a.status,
            a.submitted_at,

            s.first_name,
            s.last_name,

            u.email,

            p.program_name

        FROM applications a

        INNER JOIN students s
            ON a.student_id = s.student_id

        INNER JOIN users u
            ON s.user_id = u.user_id

        INNER JOIN programs p
            ON a.program_id = p.program_id

        ORDER BY a.created_at DESC

        LIMIT 10
    `);


    return {
        totalStudents: Number(studentResult[0].totalStudents || 0),
        activeStudents: Number(studentResult[0].activeStudents || 0),
        inactiveStudents: Number(studentResult[0].inactiveStudents || 0),

        totalApplications: Number(
            applicationResult[0].totalApplications || 0
        ),

        approvedApplications: Number(
            applicationResult[0].approvedApplications || 0
        ),

        pendingApplications: Number(
            applicationResult[0].pendingApplications || 0
        ),

        rejectedApplications: Number(
            applicationResult[0].rejectedApplications || 0
        ),

        totalPayments: Number(
            paymentResult[0].totalPayments || 0
        ),

        paidPayments: Number(
            paymentResult[0].paidPayments || 0
        ),

        pendingPayments: Number(
            paymentResult[0].pendingPayments || 0
        ),

        recentApplications
    };
};


module.exports = {
    getDashboard
};