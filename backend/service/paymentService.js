const db = require("../db/dbConfig");


// GET PAYMENT
const getPayment = async (userId) => {

  const [rows] = await db.query(
    `SELECT 
        p.payment_id,
        p.amount,
        p.payment_method,
        p.transaction_reference,
        p.payment_status,
        p.payment_date
     FROM payments p
     JOIN applications a
       ON p.application_id = a.application_id
     JOIN students s
       ON a.student_id = s.student_id
     WHERE s.user_id = ?
     ORDER BY p.payment_id DESC
     LIMIT 1`,
    [userId]
  );

  return rows[0] || null;
};


// CREATE PAYMENT
const createPayment = async (userId, paymentMethod) => {

  const [applications] = await db.query(
    `SELECT a.application_id
     FROM applications a
     JOIN students s
       ON a.student_id = s.student_id
     WHERE s.user_id = ?
     ORDER BY a.application_id DESC
     LIMIT 1`,
    [userId]
  );

  if (!applications.length) {
    throw new Error("Application not found");
  }

  const applicationId = applications[0].application_id;


  const [existing] = await db.query(
    `SELECT payment_id
     FROM payments
     WHERE application_id = ?
     LIMIT 1`,
    [applicationId]
  );

  if (existing.length) {
    throw new Error("Payment already exists");
  }


  await db.query(
    `INSERT INTO payments
     (application_id, amount, payment_method, payment_status)
     VALUES (?, ?, ?, 'pending')`,
    [
      applicationId,
      5000,
      paymentMethod
    ]
  );

  return "Payment created successfully";
};


// TEST PAYMENT
const testPayment = async (userId) => {

  const [applications] = await db.query(
    `SELECT a.application_id
     FROM applications a
     JOIN students s
       ON a.student_id = s.student_id
     WHERE s.user_id = ?
     ORDER BY a.application_id DESC
     LIMIT 1`,
    [userId]
  );

  if (!applications.length) {
    throw new Error("Application not found");
  }

  const applicationId = applications[0].application_id;


  const [payments] = await db.query(
    `SELECT payment_id
     FROM payments
     WHERE application_id = ?
     LIMIT 1`,
    [applicationId]
  );

  if (!payments.length) {
    throw new Error("Payment not found");
  }


  const transactionReference = "TEST-" + Date.now();


  await db.query(
    `UPDATE payments
     SET payment_status = 'paid',
         transaction_reference = ?,
         payment_date = NOW()
     WHERE payment_id = ?`,
    [
      transactionReference,
      payments[0].payment_id
    ]
  );


  return "Test payment successful";
};
// ===============================
// DEAN - GET ALL PAYMENTS
// ===============================

const getDeanPayments = async () => {

    const sql = `
        SELECT
            p.payment_id,
            p.amount,
            p.payment_method,
            p.transaction_reference,
            p.payment_status,
            p.payment_date,

            s.student_id,
            s.first_name,
            s.middle_name,
            s.last_name,

            u.email,

            pr.program_name

        FROM payments p

        JOIN applications a
            ON p.application_id = a.application_id

        JOIN students s
            ON a.student_id = s.student_id

        JOIN users u
            ON s.user_id = u.user_id

        LEFT JOIN programs pr
            ON a.program_id = pr.program_id

        ORDER BY p.payment_id DESC
    `;

    const [result] = await db.query(sql);

    return result;
};

module.exports = {
  getPayment,
  createPayment,
  testPayment,
  getDeanPayments
};
