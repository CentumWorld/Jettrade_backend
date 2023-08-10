const jwt = require("jsonwebtoken");
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const Member = require("../model/memberSchema");

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

// exports.authenticateAdmin = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.adminId = decoded.userId; // Save the admin ID from the token in the request object
//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

// exports.authorizeAdmin = async (req, res, next) => {
//   const adminId = req.adminId;
//   console.log(adminId);

//   try {
//     const admin = await Admin.findOne({ _id: adminId });

//     if (!admin) {
//       return res
//         .status(403)
//         .json({ message: "You are not authorized as an admin" });
//     }
//     next();
//   } catch (error) {
//     console.log(error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

//==========

exports.authenticateAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded, "dddddd")
    req.userId = decoded.userId; // Save the user ID from the token in the request object
    console.log(req.userId, "uuuuu")

    const user = await User.findById(decoded.userId);
    console.log(user._id, "uhihiuhi")
    const admin = await Admin.findById(decoded.userId);

    if (!user && !admin) {
      return res.status(403).json({ message: "You are not authorized" });
    }

    req.adminId = admin ? admin._id : user._id; // Set adminId if user is admin

 

    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

exports.authorizeAdmin = async (req, res, next) => {
  const adminId = req.adminId;

  if (!adminId) {
    return res.status(403).json({ message: "You are not authorized" });
  }

  try {
    const user = await User.findById(adminId);

    if (user && user.isSubAdmin) {
      // If the user is a subadmin, they are authorized
      next();
    } else {
      return res.status(403).json({ message: "You are not authorized" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



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
    console.log(memberId, "++++++");
    const member = await Member.findById(memberId);
    console.log(member, "-------");
    if (!member) {
      return res
        .status(403)
        .json({
          status: false,
          message: "You are not authorized as an member",
        });
    }
    next();
  } catch (error) {
    console.log(error.message, "middleware seever error");
    return res
      .status(500)
      .json({ status: false, message: "Internal server erro" });
  }
};
