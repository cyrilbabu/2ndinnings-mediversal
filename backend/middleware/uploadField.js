import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "2nd-innings-Images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const uploadImage = multer({ storage: imageStorage });
