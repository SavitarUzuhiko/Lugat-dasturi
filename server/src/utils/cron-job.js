const cron = require('node-cron');
const UploadController = require('../controllers/Upload/Upload.controller');

cron.schedule("59 23 * * *", async () => {
  const data = await UploadController.deletWithFileCron()
  console.info(`
    Cron job completed. Deleted files ${data}! Date: ${new Date().toLocaleDateString()}
    `)
})