const multer = require('multer');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    const fileExtension = file.originalname.split('.').pop();
    const filename = `${file.fieldname}_${uniqueSuffix}.${fileExtension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

const handleFileUpload = (upload.single('file'), async (req, pseudo) => {
  try {
    // Access the uploaded file via req.file
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Process the file and save it to the desired location
    const filePath = req.file.path;
    // Implement your own logic here for handling the uploaded file

    // Return the path or filename of the saved file
    return filePath;
  } catch (err) {
    // Handle any errors that occur during file handling
    console.error(err);
    throw new Error('File upload failed');
  }
});
