const service = require("../service/registerDashService");

const getRegistrarDashboard = async (req, res) => {

  try {

    const dashboard =
      await service.getRegistrarDashboard();

    res.json({
      success: true,
      dashboard
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  getRegistrarDashboard
};