const db = require("../db/dbConfig");

const getRegistrarDashboard = async () => {

  // Application counts
  const [counts] = await db.query(`
    SELECT
      COUNT(*) AS total,
      SUM(status = 'pending') AS pending,
      SUM(status = 'approved') AS approved,
      SUM(status = 'rejected') AS rejected
    FROM applications
  `);

  // Recent applications
  const [applications] = await db.query(`
    SELECT
      a.application_id,
      CONCAT(s.first_name, ' ', s.last_name) AS student_name,
      p.program_name,
      a.academic_year,
      a.status,
      a.created_at
    FROM applications a
    JOIN students s
      ON a.student_id = s.student_id
    JOIN programs p
      ON a.program_id = p.program_id
    ORDER BY a.application_id DESC
    LIMIT 10
  `);

  return {
    counts: counts[0],
    applications
  };
};

module.exports = {
  getRegistrarDashboard
};