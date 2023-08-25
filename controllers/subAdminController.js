const SubAdmin = require("../model/subadminSchema");
const {
    isValidImage,
    isValidEmail,
    isValidPhone,
    isValidName,
    isValidPassword,
  } = require("../validation/validation");


exports.getOwnSubAdminDetails = async (req, res) => {
  try {
    const id = req.subAdminId;

    const subAdmin = await SubAdmin.findById(id);

    if (!subAdmin) {
      return res.status(404).json({ message: "Sub-admin not found" });
    }

    return res
      .status(200)
      .json({
        message: "Fetched sub-admin details successfully",
        data: subAdmin,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateOwnSubAdminDetails = async (req, res) => {
  try {
    const { fname, lname, email, phone, gender, dob } = req.body;
    const id = req.subAdminId;
    
    if (!fname || !lname || !email || !phone || !gender||!dob ) {
      return res.status(422).json({ message: "All fields are required." });
    }

    if (fname && !isValidName(fname)) {
      return res.status(422).json({ message: "Invalid first name format." });
    }
    if (lname && !isValidName(lname)) {
      return res.status(422).json({ message: "Invalid last name format." });
    }

    // Validate email format
    if (email && !isValidEmail(email)) {
      return res.status(422).json({ message: "Invalid email format." });
    }

    // Validate phone number format
    if (phone && !isValidPhone(phone)) {
      return res.status(422).json({ message: "Invalid phone number format." });
    }

    const updatedSubAdmin = await SubAdmin.findOneAndUpdate(
      { _id: id },
      {
        fname,
        lname,
        email,
        phone,
        gender,
        dob
      },
      { new: true } // Return the updated document
    );

    if (!updatedSubAdmin) {
      return res.status(404).json({ message: "Sub-admin not found" });
    }

    res.status(200).json({
      message: "Sub-admin details updated successfully",
      subAdmin: updatedSubAdmin,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

