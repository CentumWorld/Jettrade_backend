const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const memberController = require('../../controllers/memberController');
const checkMiddleware = require('../../middleware/checkAuth');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3()


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/img/users/doc')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${file.originalname}-${Date.now()}`)
//     }
// })
//const upload = multer({ storage: storage })

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
var multipleupload = upload.fields([{ name: 'aadhar_front_side' }, { name: 'aadhar_back_side' },{name:'pan_card'}]);
router.post('/member-profile-verification',checkMiddleware.checkAuth, multipleupload, memberController.memberProfileVerification);


module.exports = router;