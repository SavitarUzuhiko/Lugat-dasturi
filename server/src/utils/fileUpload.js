const multer = require('multer');
const HttpException = require('./HttpException');
const path = require('path');


const checkFileType = (file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  }
  cb(new HttpException(400, 'Only images are allowed' + fileTypes));
};

module.exports = uploadFile = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});
