import multer from "multer";
import path from "path";

// Storage config for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save into public/schoolImages
    cb(null, "public/schoolImages");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Only accept image files
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
}

export const upload = multer({
  storage,
  fileFilter,
});
