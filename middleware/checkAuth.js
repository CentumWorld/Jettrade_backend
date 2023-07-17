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

const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json("Unauthorized");
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ status: false, message: err.message });
      }
      console.log(decoded, "==========");
      req.user = decoded; // Set the decoded token on the request object for further use

      console.log(req.user, "00000000000")



      const userId = req.user.userId; // Extract the user ID from req.user

      console.log(userId, "---------"); // You can access the user ID here


      next(); // Proceed to the next middleware
    });
  } catch (error) {
    return res.status(400).json("Invalid Token");
  }
}


module.exports = {
  checkAuth: verifyToken,
};
