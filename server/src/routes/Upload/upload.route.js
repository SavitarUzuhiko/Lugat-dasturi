const router = require('express').Router();
const UploadController = require('../../controllers/Upload');
const uploadFile = require('../../utils/fileUpload');

router.post('/',uploadFile.single("image"),UploadController.uploadFile);

module.exports = router;