const db = require("../db/dbConfig");

const uploadDocuments = async (userId, files) => {

  // Find student
  const [student] = await db.query(
    "SELECT student_id FROM students WHERE user_id = ?",
    [userId]
  );

  if (!student.length) {
    throw new Error("Student not found");
  }

  // Find application
  const [application] = await db.query(
    `SELECT application_id
     FROM applications
     WHERE student_id = ?
     LIMIT 1`,
    [student[0].student_id]
  );

  if (!application.length) {
    throw new Error("Application not found");
  }

  const applicationId = application[0].application_id;

  // Certificate
  if (files.certificate) {
    const file = files.certificate[0];

    await db.query(
      `INSERT INTO documents
      (application_id, document_type, file_name,
       file_path, file_type, file_size)
      VALUES (?, 'certificate', ?, ?, ?, ?)`,
      [
        applicationId,
        file.originalname,
        `/uploads/documents/${file.filename}`,
        file.mimetype,
        file.size
      ]
    );
  }

  // National ID
  if (files.national_id) {
    const file = files.national_id[0];

    await db.query(
      `INSERT INTO documents
      (application_id, document_type, file_name,
       file_path, file_type, file_size)
      VALUES (?, 'national_id', ?, ?, ?, ?)`,
      [
        applicationId,
        file.originalname,
        `/uploads/documents/${file.filename}`,
        file.mimetype,
        file.size
      ]
    );
  }

  return "Documents uploaded successfully";
};

module.exports = { uploadDocuments };