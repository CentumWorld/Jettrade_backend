const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const adminController = require('../controllers/adminController');
const {authenticateAdmin, authorizeRole} = require('../middleware/checkAuth');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const s3 = new AWS.S3()


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
var multipleUpload = upload.fields([{ name: 'aadhar_front_side' },{ name: 'aadhar_back_side' },{name:'pan_card'}]);
router.post('/create-sub-admin-inside-admin',multipleUpload, adminController.createSubAdminInsideAdmin);


module.exports = router;