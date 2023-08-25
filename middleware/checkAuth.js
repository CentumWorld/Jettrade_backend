const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const Member = require("../model/memberSchema");
const SubAdmin = require("../model/subadminSchema");
const State = require("../model/stateHandlerSchema");
const Franchise = require("../model/frenchiseSchema");
const BusinessDeveloper = require("../model/businessDeveloperSchema");
// exports.checkAuth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(403).json("Unauthorized");
//   }

//   try {
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.status(400).json({ status: false, message: err.message });
//       }
//       req.user = decoded; // Set the decoded token on the request object for further use

//       const userId = req.user.userId; // Extract the user ID from req.user

//       next(); // Proceed to the next middleware
//     });
//   } catch (error) {
//     return res.status(400).json("Invalid Token");
//   }
// };

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

    console.log(  req.subAdminId, "subadminid")

    const admin = await Admin.findById(decoded.userId);
    const subAdmin = await SubAdmin.findById(decoded.subAdminId);
    console.log(subAdmin, "subadmidetails")
    const state = await State.findById(decoded.stateHandlerId);
    const franchise = await Franchise.findById(decoded.franchiseId);
    const businessDeveloper = await BusinessDeveloper.findById(
      decoded.businessDeveloperId
    );

    if (!admin && !subAdmin && !state && !franchise && !businessDeveloper) {
      return res.status(401).json({ message: "User not found" });
    }

    req.userRoles = [];

    if (admin) {
      req.userRoles.push("admin");
    }

   

    if (subAdmin) {
      req.userRoles.push("subAdmin");
      req.isSubAdmin = true; // Set isSubAdmin to true for subadmin
      req.isVideoCreator = subAdmin.isVideoCreator; // Set isVideoCreator based on subadmin property
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

exports.authorizeAdmin = async (req, res, next) => {
  try {
    if (req.isAdmin) {
      // If user is an admin, allow access
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized as an admin" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//===================

exports.authorizeVideoUpload = async (req, res, next) => {
  try {
    if (req.isAdmin || (req.isSubAdmin && req.isVideoCreator)) {
      // If user is an admin or a subadmin with isVideoCreator true, allow video upload
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

//==========

// exports.authenticateAdmin = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     console.log(decoded.userId, "dddddd");
//     req.userId = decoded.userId; // Save the user ID from the token in the request object

//     console.log(req.userId, "uuuuu");

//     const user = await User.findById(decoded.userId);

//     const admin = await Admin.findById(decoded.userId);

//     console.log(admin, "4444444444");

//     console.log(admin, "admin");

//     if (!user && !admin) {
//       return res.status(403).json({ message: "You are not authorized1111" });
//     }

//     req.adminId = admin ? admin._id : user._id;

//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// exports.authorizeAdmin = async (req, res, next) => {
//   const adminId = req.adminId;

//   if (!adminId) {
//     return res.status(403).json({ message: "You are not authorized" });
//   }

//   try {
//     const user = await User.findById(adminId);
//     const admin = await Admin.findById(adminId);

//     if (user && user.isSubAdmin) {
//       next();
//     } else if (admin) {
//       next();
//     } else {
//       return res.status(403).json({ message: "You are not authorized as an admin or a sub admin" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//======
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

//======================================================================

exports.authenticateState = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.stateHandlerId = decoded.stateHandlerId;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

//==========================================================================

exports.authorizeState = async (req, res, next) => {
  try {
    const stateHandlerId = req.stateHandlerId;
    const state = await State.findById(stateHandlerId);
    if (!state) {
      return res.status(403).json({
        status: false,
        message: "You are not authorized as an state handler",
      });
    }
    next();
  } catch (error) {
    console.log(error.message, "middleware server error");
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
