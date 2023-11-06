const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    type: { type: String },
    description: { type: String },
    specs: { type: String },
    tutorials: { type: String },
    availability: { type: Boolean, default: true },
    location: { type: String },
    rentalPrice: { type: Number },
    images: [String],
  },
  { timestamps: true }
);

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
