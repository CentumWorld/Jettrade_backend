const mongoose = require("mongoose");
const {
    isValidName,
    isValidPhone,
    isValidEmail,
    isValidPassword,
    isValidImage
  } = require("../validation/validation");
const frenchiseSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isValidName,
      message: "Invalid first name format."
    }
  },
  lname: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isValidName,
      message: "Invalid last name format."
    }
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isValidPhone,
      message: "Invalid phone number format. Use 10 digits or include country code."
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isValidEmail,
      message: "Invalid email format."
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: isValidPassword,
      message: "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one digit."
    }
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  adharCard: {
    type: String,
    required: true,
    validate: {
      validator: isValidImage,
      message: "Invalid adharCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format."
    }
  },
  panCard: {
    type: String,
    required: true,
    validate: {
      validator: isValidImage,
      message: "Invalid panCard image format, image must be in jpeg, jpg, tiff, png, webp, or bmp format."
    }
  },
  frenchiseId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (value) => /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(value),
      message: "Frenchise ID should have at least 1 letter and 1 digit, minimum length 6."
    }
  },
  referredId: {
    type: String,
    required: true,
    trim: true
  },
  referralId: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const frenchise = mongoose.model("Frenchise", frenchiseSchema);

module.exports = frenchise;
