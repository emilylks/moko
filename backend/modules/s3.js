const AWS = require('aws-sdk');

var s3 = new AWS.S3({
  accessKeyId:'Your access key here',
  secretAccessKey:'Your secret access key here',
  region:'us-east-2'
});

const S3 = function(params) {
  this.fileName = params.fileName,
  this.fileBody = params.fileBody
};

/* Params:
Bucket: 'mokopinnacle',
ACL: 'public-read',
Key: imgPath,
ContentType: 'image/jpeg
*/
S3.createImage = (params, result) => {
  const createParams = {
    Bucket: 'mokopinnacle',
    ACL: 'public-read',
    Key: params.fileName,
    Body: params.fileBody,
    ContentType: 'image/jpeg'
  };

  s3.upload(createParams).promise()
    .then(data => data.Location)
    .catch(error => result(error, null));
};

S3.updateImage = (params, result) => {
  const updateParams = {
    Bucket: 'mokopinnacle',
    ACL: 'public-read',
    Key: params.fileName,
    Body: params.fileBody,
    ContentType: 'image/jpeg'
  };

  s3.putObject(updateParams).promise()
  .then(data => result(null, data.Location))
  .catch(error => result(error, null));
}

/* Params:
  Bucket: 'mokopinnacle',
  Key: imgPath
*/
S3.deleteImage = (params, result) => {
  const deleteParams = {
    Bucket: 'mokopinnacle',
    Key: params.fileName
  };

  s3.deleteObject(deleteParams).promise()
    .then(data => result(null, true))
    .catch(error => result(error, null));
};

module.exports = S3;
