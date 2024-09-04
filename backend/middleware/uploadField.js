import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "Images",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image", // Optional, Cloudinary handles images by default
  },
});

export const uploadImage = multer({ storage: imageStorage });
