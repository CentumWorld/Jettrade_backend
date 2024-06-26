

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Create the multer upload middleware for S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const filename = file.originalname;
      cb(null, filename);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'videoOne' || file.fieldname === 'thumbnail'|| file.fieldname === 'adharCard'|| file.fieldname === 'panCard'|| file.fieldname=== "profilePhoto"|| file.fieldname === 'adhar_front_side' || file.fieldname === "adhar_back_side"
    || file.fieldname === 'pan_card'|| file.fieldname=== "aadhar_back_side"|| file.fieldname === 'aadhar_front_side'||file.fieldname === 'audio'
    
    ) {//aaddhar_back_side
      cb(null, true);
    } else {
      cb(new Error('Invalid field name for the file upload.'));
    }
  },
});

module.exports = upload;

