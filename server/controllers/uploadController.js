const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

exports.uploadImage = upload.single('image');

exports.uploadImageToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'GurudevKiranaStores',
        public_id: uuidv4(),
        quality: 'auto:low',       // Automatically set quality based on image content
        format: 'jpg',             // Convert to JPEG for better compression
        width: 800,                // Resize to max width of 800px (optional, adjust as needed)
        crop: 'limit'              // Prevent upscaling if image is smaller than 800px
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(fileBuffer);
  });
};
