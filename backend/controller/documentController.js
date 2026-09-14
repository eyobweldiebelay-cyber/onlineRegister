const service = require("../service/documentService");

const uploadDocuments = async (req, res) => {
  try {

    const userId = req.user.user_id || req.user.userid;

    const message = await service.uploadDocuments(
      userId,
      req.files
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

module.exports = { uploadDocuments };