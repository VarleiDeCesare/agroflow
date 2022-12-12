import { resolve } from 'path';

const uploadConfig = {
  provider: process.env.UPLOAD_DRIVER,
  s3: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
    bucket: process.env.AWS_S3_BUCKET,
  },
  disk: {
    destination: resolve(__dirname, '..', 'tmp', 'uploads'),
  },
};

export default uploadConfig;
