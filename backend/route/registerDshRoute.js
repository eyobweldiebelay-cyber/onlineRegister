const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const roleAuth=require("../middleware/roleMiddleware");

const controller =require("../controller/registerDshControler");

router.get("/registrar",auth,roleAuth("registrar"),controller.getRegistrarDashboard);

module.exports = router;