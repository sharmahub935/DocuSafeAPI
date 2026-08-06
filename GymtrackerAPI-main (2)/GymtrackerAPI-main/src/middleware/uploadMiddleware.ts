import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const uploadDirectory = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
]);

const allowedExtensions = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeFilename = `${crypto.randomUUID()}${extension}`;

    callback(null, safeFilename);
  },
});

const fileFilter: multer.Options["fileFilter"] = (
  _req,
  file,
  callback
) => {
  const extension = path.extname(file.originalname).toLowerCase();

  const validType =
    allowedMimeTypes.has(file.mimetype) &&
    allowedExtensions.has(extension);

  if (!validType) {
    callback(
      new Error("Only PDF, Word, PNG, and JPEG files are allowed")
    );
    return;
  }

  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

export default upload;