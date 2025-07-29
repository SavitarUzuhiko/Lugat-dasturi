require('dotenv').config({ path: './.env' });
const secret = {
  mongo_url: process.env.MONGO_URL,
  port: process.env.PORT,
  aws_access_key : process.env.AWS_ACCESS_KEY,
  aws_secret_key : process.env.AWS_SECRET_KEY,
  aws_s3_bucket: process.env.AWS_S3_BUCKET,
  aws_region: process.env.AWS_REGION,
}

module.exports = secret