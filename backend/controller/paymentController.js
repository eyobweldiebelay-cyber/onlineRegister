const paymentService = require("../service/paymentService");


// GET PAYMENT
const getPayment = async (req, res) => {

  try {

    const userId = req.user.user_id || req.user.userid;

    const payment = await paymentService.getPayment(userId);

    res.json({
      success: true,
      payment
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// CREATE PAYMENT
const createPayment = async (req, res) => {

  try {

    const userId = req.user.user_id || req.user.userid;

    const { paymentMethod } = req.body;


    if (!paymentMethod) {

      return res.status(400).json({
        success: false,
        message: "Please select payment method"
      });

    }


    if (!["telebirr", "CBE"].includes(paymentMethod)) {

      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });

    }


    const message = await paymentService.createPayment(
      userId,
      paymentMethod
    );


    res.json({
      success: true,
      message
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


// TEST PAYMENT
const testPayment = async (req, res) => {

  try {

    const userId = req.user.user_id || req.user.userid;

    const message = await paymentService.testPayment(userId);

    res.json({
      success: true,
      message
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};
// ===============================
// DEAN - GET ALL PAYMENTS
// ===============================

const getDeanPayments = async (req, res) => {

    try {

        const payments =
            await paymentService.getDeanPayments();

        res.status(200).json({
            success: true,
            payments
        });

    } catch (error) {

        console.error(
            "Dean payments error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get Dean payments",
            error: error.message
        });

    }
};


module.exports = {
  getPayment,
  createPayment,
  testPayment,
  getDeanPayments
};