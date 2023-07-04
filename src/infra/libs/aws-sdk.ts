import AWS from 'aws-sdk';
import { awsConfig } from '@/config/aws';

AWS.config.update({
  accessKeyId: awsConfig.accessKey,
  secretAccessKey: awsConfig.secretKey,
  region: awsConfig.region,
});

export { AWS };