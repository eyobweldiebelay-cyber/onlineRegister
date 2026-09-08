const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const roleAuth=require("../middleware/roleMiddleware");

const controller =require("../controller/dashboardController");


router.get("/student",auth,roleAuth("student"),controller.getStudentDashboard);


module.exports = router;