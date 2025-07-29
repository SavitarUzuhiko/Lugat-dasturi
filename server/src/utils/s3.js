const { S3Client } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const secret = require('./secret');
const HttpException = require('./HttpException');

const s3Client = new S3Client({
  region: secret.aws_region,
  endpoint: `https://s3.${secret.aws_region}.amazonaws.com`,
  credentials: {
    accessKeyId: secret.aws_access_key,
    secretAccessKey: secret.aws_secret_key,
  },
});

module.exports = uploadFileS3 = async (Key, Body) => {
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: secret.aws_s3_bucket,
      Key,
      Body,
    },
  });

  const result = await upload.done();

  if (result.$metadata.httpStatusCode !== 200) {
    throw new HttpException(400, 'File upload failed');
  }

  return result.Location;
};
