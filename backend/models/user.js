const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = `${process.env.JWT_SECRET_KEY}`;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3, max: 255 },
    lastName: { type: String, required: true, min: 3, max: 255 },
    email: { type: String, required: true, unique: true, min: 6, max: 255 },
    password: { type: String, required: true, min: 6, max: 1024 },
    phoneNumber: { type: String },
    address: { type: String },
    practices: [String],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    farmLocations: [String],
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
