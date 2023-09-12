const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const Member = require("../model/memberSchema");
const SubAdmin = require("../model/subadminSchema");
const State = require("../model/stateHandlerSchema");
const Franchise = require("../model/frenchiseSchema");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
const VideoCreater = require("../model/VideoCreaterSchema");

exports.authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    req.stateHandlerId = decoded.stateHandlerId;
    req.businessDeveloperId = decoded.businessDeveloperId;
    req.franchiseId = decoded.franchiseId;
    req.subAdminId = decoded.subAdminId;

    const admin = await Admin.findById(decoded.userId);
    const subAdmin = await SubAdmin.findById(decoded.subAdminId);
    const state = await State.findById(decoded.stateHandlerId);
    const franchise = await Franchise.findById(decoded.franchiseId);
    const businessDeveloper = await BusinessDeveloper.findById(
      decoded.businessDeveloperId
    );
    const videoCreator = await VideoCreater.findById(decoded.userId);

    if (
      !admin &&
      !subAdmin &&
      !state &&
      !franchise &&
      !businessDeveloper &&
      !videoCreator
    ) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userRoles = [];

    if (admin) {
      req.userRoles.push("admin");
    }

    if (subAdmin) {
      req.userRoles.push("subAdmin");
      req.isSubAdmin = true;
      req.isVideoCreator = subAdmin.isVideoCreator;
    }

    if (state) {
      req.userRoles.push("state");
    }

    if (franchise) {
      req.userRoles.push("franchise");
    }

    if (businessDeveloper) {
      req.userRoles.push("businessDeveloper");
    }

    if (videoCreator) {
      req.userRoles.push("videoCreator");
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

exports.authorizeRole = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      if (req.userRoles.some((role) => allowedRoles.includes(role))) {
        // If user has any of the allowed roles, allow access
        next();
      } else {
        return res.status(403).json({ message: "You are not authorized" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

//===================

exports.authorizeVideoUpload = async (req, res, next) => {
  try {
    if (
      req.userRoles.includes("admin") ||
      (req.userRoles.includes("subAdmin") && req.isVideoCreator)
    ) {
      // If user is a subadmin and is a video creator, allow video upload
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to upload videos" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//==================

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId; // Save the user ID from the token in the request object
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
};

exports.authorizeUser = async (req, res, next) => {
  // Assuming you have a middleware that sets the userId in req.userId
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res
        .status(403)
        .json({ status: false, message: "You are not authorized as an user" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error" });
  }
};

exports.authenticateMember = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.memberId = decoded.userId;
    next();
  } catch (error) {
    console.log(error.message, "server error");
    return res
      .status(500)
      .json({ status: false, message: "Internal Server error" });
  }
};

//authorize member

exports.authorizeMember = async (req, res, next) => {
  try {
    const memberId = req.memberId;
    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized as an member",
      });
    }
    next();
  } catch (error) {
    console.log(error.message, "middleware seever error");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
