const express = require('express');
const connection = require('../../database/conn')
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const AppError = require('../../utils/appError')
const AWS = require('aws-sdk');
//const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const userController = require('../../controllers/userController');
const checkMiddleware = require('../../middleware/checkAuth');

 AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// const s3Client = new S3Client({
//     region: process.env.AWS_REGION,
//     credentials: {
//       accessKeyId:process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     }
//   });

// create S3 instance
const s3 = new AWS.S3()




// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/img/users/profilePic')
//     },
//     filename: function (req, file, cb) {
//         cb(null,`${file.originalname}`)
//     }
// })

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//       cb(null, true);
//     } else {
        
//      return cb(new Error('Not an image! Please upload only images.'));
//     }
//   }

// const upload = multer({ storage: storage 
//     //, fileFilter: multerFilter
 

// setup multer middleware to handle file uploads to S3
const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket:process.env.BUCKET,
         acl:'public-read',
        metadata:(req,file,cb) =>{
            cb(null,{fieldName:file.fieldname});
        },
        key:(req,file,cb) =>{
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const filename = file.originalname;
            cb(null,filename);
        },
        
    }),
});


var singleUpload = upload.single('image');
router.post('/profilePhotoUpload', singleUpload,checkMiddleware.checkAuth, userController.profilePhotoUpload);


module.exports = router;