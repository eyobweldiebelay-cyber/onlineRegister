const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const studentController = require('../controller/studentController');

router.post(
    "/student",
    authMiddleware,
    roleMiddleware("student"),
    studentController.studentUser
);
// ===============================
// ADD THIS FOR REGISTRAR
// ===============================

router.get(
    "/registrar/students",
    authMiddleware,
    roleMiddleware("registrar"),
    studentController.getStudents
);


router.put(
    "/registrar/students/:id/activate",
    authMiddleware,
    roleMiddleware("registrar"),
    studentController.activate
);


router.put(
    "/registrar/students/:id/deactivate",
    authMiddleware,
    roleMiddleware("registrar"),
    studentController.deactivate
);
// ===============================
// ADD THIS FOR DEAN
// ===============================

router.get(
    "/dean/students",
    authMiddleware,
    roleMiddleware("dean"),
    studentController.getDeanStudentsController
);
module.exports = router;