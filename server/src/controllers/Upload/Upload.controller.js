const HttpException = require('../../utils/HttpException');
const UploadModel = require('../../models/Upload');
const uploadFileS3 = require('../../utils/s3');
const {v4} = require('uuid');
const path = require('path');

class UploadController {
  static uploadFile = async (req, res) => {
    const uploadedFile = req.file;

    if (!uploadedFile) throw new HttpException(400, 'File not provided');

    const filePath = await uploadFileS3(
      v4() + path.extname(uploadedFile.originalname),
      uploadedFile.buffer
    );

    await UploadModel.create({ filePath });

    res.json({ success: true, msg: 'File uploaded successfully', filePath });
  };
}

module.exports = UploadController;
