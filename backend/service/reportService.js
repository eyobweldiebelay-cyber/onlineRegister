const db = require('../db/dbConfig');

const getRegistrarReportService = async () => {
    // Application summary
    const [applicationSummary] = await db.query(`
        SELECT
            COUNT(*) AS totalApplications,

            SUM(
                CASE
                    WHEN status = 'pending' THEN 1
                    ELSE 0
                END
            ) AS pendingApplications,

            SUM(
                CASE
                    WHEN status = 'approved' THEN 1
                    ELSE 0
                END
            ) AS approvedApplications,

            SUM(
                CASE
                    WHEN status = 'rejected' THEN 1
                    ELSE 0
                END
            ) AS rejectedApplications

        FROM applications
    `);

    // Student summary
    const [studentSummary] = await db.query(`
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

    // Applications by program
    const [programSummary] = await db.query(`
        SELECT
            p.program_name AS programName,
            COUNT(a.application_id) AS totalApplications

        FROM programs p

        LEFT JOIN applications a
            ON p.program_id = a.program_id

        GROUP BY
            p.program_id,
            p.program_name

        ORDER BY totalApplications DESC
    `);

    return {
        applicationSummary: applicationSummary[0],
        studentSummary: studentSummary[0],
        programSummary
    };
};
// ADD DEAN REPORT HERE
// ===============================

const getDeanReportService = async () => {

    // Student summary
    const [studentSummary] = await db.query(`
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


    // Application summary
    const [applicationSummary] = await db.query(`
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


    // Payment summary
    const [paymentSummary] = await db.query(`
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
            ) AS pendingPayments,

            SUM(
                CASE
                    WHEN payment_status = 'failed' THEN 1
                    ELSE 0
                END
            ) AS failedPayments,

            COALESCE(
                SUM(
                    CASE
                        WHEN payment_status = 'paid' THEN amount
                        ELSE 0
                    END
                ),
                0
            ) AS totalPaidAmount

        FROM payments
    `);


    return {
        studentSummary: studentSummary[0],
        applicationSummary: applicationSummary[0],
        paymentSummary: paymentSummary[0]
    };
};

module.exports = {
    getRegistrarReportService,
    getDeanReportService
};