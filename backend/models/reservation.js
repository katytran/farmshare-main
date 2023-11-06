const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    equipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    rentalTotal: { type: Number },
    rentalDuration: { type: String },
    rentalPrice: { type: Number },
    reservationStatus: {
      type: String,
      enum: ["pending", "approved", "canceled", "filled"],
      default: "pending",
    },
    pickupLocation: { type: String },
    dropOffLocation: { type: String },
    deliveryAssistance: { type: Boolean, default: false },
    pickupAssistance: { type: Boolean, default: false },
    paymentMethod: { type: String },
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
