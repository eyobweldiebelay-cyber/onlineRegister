const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const controller = require("../controller/documentController");
const auth = require("../middleware/authMiddleware");

router.post(
  "/upload",
  auth,
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "national_id", maxCount: 1 }
  ]),
  controller.uploadDocuments
);

module.exports = router;