import { Cloudinary } from "@cloudinary/url-gen";

// Initialize Cloudinary with only cloud name (no API key or secret)
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dhfky54ml", // Your Cloudinary cloud name
  },
  url: {
    secure: true, // Force HTTPS
  },
});

export default cloudinary;
