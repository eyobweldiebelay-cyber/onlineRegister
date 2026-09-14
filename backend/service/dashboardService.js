const db = require("../db/dbConfig");

const getStudentDashboard = async (userId) => {

  // Get student
  const [students] = await db.query(
    `SELECT 
        student_id,
        first_name,
        middle_name,
        last_name
     FROM students
     WHERE user_id = ?`,
    [userId]
  );

  if (!students.length) {
    throw new Error("Student not found");
  }

  const student = students[0];


  // Get latest application
  const [applications] = await db.query(
    `SELECT
        a.application_id,
        a.status,
        p.program_name,
        a.academic_year
     FROM applications a
     JOIN programs p
       ON a.program_id = p.program_id
     WHERE a.student_id = ?
     ORDER BY a.application_id DESC
     LIMIT 1`,
    [student.student_id]
  );


  let application = null;
  let documentsUploaded = 0;
  let payment = null;


  if (applications.length) {

    application = applications[0];


    // Count uploaded documents
    const [documents] = await db.query(
      `SELECT COUNT(*) AS total
       FROM documents
       WHERE application_id = ?`,
      [application.application_id]
    );

    documentsUploaded = documents[0].total;


    // Get payment
    const [payments] = await db.query(
      `SELECT
          amount,
          payment_method,
          payment_status,
          transaction_reference,
          payment_date
       FROM payments
       WHERE application_id = ?
       ORDER BY payment_id DESC
       LIMIT 1`,
      [application.application_id]
    );

    if (payments.length) {
      payment = payments[0];
    }
  }


  return {
    student: {
      first_name: student.first_name,
      middle_name: student.middle_name,
      last_name: student.last_name
    },

    application: application,

    documents: {
      uploaded: documentsUploaded,
      required: 2
    },

    payment: payment
  };
};


module.exports = {
  getStudentDashboard
};