const express = require("express");

const router = express.Router();

const authMiddleware =
    require("../middleware/authMiddleware");

const paymentController =require("../controller/paymentController");


router.post(
    "/",
    authMiddleware,
    paymentController.createPayment
);


router.get(
    "/my",
    authMiddleware,
    paymentController.getMyPayment
);


module.exports = router;