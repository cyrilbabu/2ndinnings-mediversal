import multer from 'multer';
import path from 'path';

export const upload = multer({
  storage: multer.memoryStorage(), // or any other storage engine you prefer
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Acceptable file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images (jpeg, jpg, png) are allowed!'));
    }
  }
});
