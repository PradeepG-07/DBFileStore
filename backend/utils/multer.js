import multer from "multer";
import path from "path";
// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
        const userId = req.user.id; // Assuming userId is sent in the request body
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const baseName = path.basename(originalName, ext);
        cb(null, `${userId}-#-${baseName}${ext}`); // Set the filename to be userId-originalFilename
    }
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

export default upload;