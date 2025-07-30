const HttpException = require('../../utils/HttpException');
const UploadModel = require('../../models/Upload');
const { uploadFileS3, deleteFileS3 } = require('../../utils/s3');
const { v4 } = require('uuid');
const path = require('path');

class UploadController {
  static uploadFile = async (req, res) => {
    const uploadedFile = req.file;
    if (!uploadedFile) throw new HttpException(400, 'File not provided');

    let fileName = 'files/' + v4() + path.extname(uploadedFile.originalname);

    if (uploadedFile.mimetype.startsWith('image/'))
      fileName = 'images/' + v4() + path.extname(uploadedFile.originalname);

    if (uploadedFile.mimetype.startsWith('video/'))
      fileName = 'videos/' + v4() + path.extname(uploadedFile.originalname);

    const filePath = await uploadFileS3(fileName, uploadedFile.buffer);

    await UploadModel.create({ filePath });

    res.json({ success: true, msg: 'File uploaded successfully', filePath });
  };
  static deletWithFileCron = async (req, res) => {
    try {
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const files = (
        await UploadModel.find(
          { is_use: false, createdAt: { $lt: oneDayAgo } },
          null,
          { lean: true }
        )
      ).map((file) => file.filePath);

      for (const file of files) {
        await deleteFileS3(file);
        await UploadModel.deleteOne({ filePath: file });
      }

      return files.length.toString();
    } catch (error) {
      console.error(error);
      return `Not`;
    }
  };
}

module.exports = UploadController;
