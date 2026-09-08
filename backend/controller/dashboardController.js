const dashboardService = require("../service/dashboardService");


const getStudentDashboard = async (req, res) => {

  try {

    const userId = req.user.user_id || req.user.userid;

    const dashboard =await dashboardService.getStudentDashboard(userId);

    res.json({
      success: true,
      dashboard
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message
    });

  }
};


module.exports = {
  getStudentDashboard
};