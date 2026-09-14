const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/documents",

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "application/pdf",
    "image/jpeg",
    "image/png"
  ];

  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only PDF, JPG and PNG are allowed"));
  }

  cb(null, true);
};

module.exports = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});