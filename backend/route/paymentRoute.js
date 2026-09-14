const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const controller = require("../controller/paymentController");


// GET PAYMENT
router.get(
  "/",
  auth,
  controller.getPayment
);


// CREATE PAYMENT
router.post(
  "/",
  auth,
  controller.createPayment
);


// TEST PAYMENT
router.post("/test",
  auth,
  controller.testPayment
);
// ===============================
// DEAN - GET ALL PAYMENTS
// ===============================

router.get(
    "/dean",
    auth,
    controller.getDeanPayments
);


module.exports = router;