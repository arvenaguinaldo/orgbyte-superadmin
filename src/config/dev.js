module.exports = (() => {
  const commonConfig = {
    environment: 'dev',
    // apiUrl: 'http://0.0.0.0:3000',
    apiUrl: 'http://localhost:3000',
    accessToken: ''
  };

  return commonConfig;
})();

export const s3Config = {
  accessKeyId: 'AKIAIRKM6VWMEJMXD4TA',
  secretAccessKey: '0vUdiqIHimqdDg1v9JM'
};

export const s3Region = 'ap-southeast-1';

