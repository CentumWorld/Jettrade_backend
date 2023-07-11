// const jwt = require('jsonwebtoken');
// const express = require('express');
// const User = require('../model/userSchema');
// const Admin = require('../model/adminSchema');
// const app = express();

// const Auth = async(req,res,next)=>{
//     try {
//         const token = req.cookies.jwtoken;
//         const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
//         req.token = token;
//         req.verifyToken = verifyToken;

//         const loginUser = await User.findOne({_id:verifyToken._id})
//         const loginAdmin = await Admin.findOne({_id:verifyToken._id})
//         //console.log(loginUser);
//         req.userid = loginUser._id;
//         req.name = loginUser.fname;
//         //console.log(loginUser._id,'16');

//         next();
//     } catch (error) {
//        res.status(401).json({message:"Unauthorized access"})
//     }
// }

// module.exports = {
//     checkAuth:Auth
// }








const jwt = require('jsonwebtoken');
require('dotenv').config();
function verifyToken(req, res, next) {

    const token = req.headers['authorization']?.split(" ")[1];
    //const token1 = token.split(" ")[1];
    //console.log(token,'44');
    if (!token) {
        return res.status(403).json("Unauthorized");
    }
    try {
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY,(err, decoded)=>{
            if(err){
                return "Token Expired"
            }
            return decoded
        });
        console.log(decodeToken);
        //req.token = decodeToken;

        if(decodeToken == 'Token Expired'){
            return res.send({status: "error" , data:"token expired"});
        }



    } catch (error) {
        return res.status(400).json("Invalid Token");
    }
    return next();
}

module.exports = {
    checkAuth: verifyToken
}