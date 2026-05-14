import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    const error = new Error("Only JPG and PNG files are allowed");
    error.status = 400;
    cb(error, false);
  },
});

export default upload;
