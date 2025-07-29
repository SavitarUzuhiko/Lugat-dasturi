require('dotenv').config();
const secret = {
  mongo_url: process.env.MONGO_URL || 'mongodb://localhost:27017/newToDo',
  port: process.env.PORT|| 3000,
  aws_access_key : process.env.AWS_ACCESS_KEY || "AKIAYLZZKJ4M3DC24XNQ",
  aws_secret_key : process.env.AWS_SECRET_KEY || "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",
  aws_s3_bucket: process.env.AWS_S3_BUCKET || "savitar-kitchen-dictionary",
  aws_region: process.env.AWS_REGION || "eu-north-1",
  aws_endpoint: process.env.AWS_ENDPOINT || "https://s3.amazonaws.com/"
}

module.exports = secret