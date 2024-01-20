const multer = require("multer");
const path = require("path");

// multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { filesize: 10000000 },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let mimetype = file.mimetype;

    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported "), false);
      return;
    }
    cb(null, true);
  },
});
