const Reservation = require("../models/reservation");
const User = require("../models/user");
const mongoose = require("mongoose");
const { now } = require("mongoose");

/**
 * GET /api/reservations
 * Fetches a list of reservations.
 */
exports.get = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      reservations,
      null,
      "Reservations fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
  try {
    const { userId, equipmentId, startDate } = req.body;
    // Create a new reservation document
    const newReservation = new Reservation({
      userId: userId,
      equipmentId: equipmentId,
      startDate: startDate,
    });

    // Find the user by ID to check if the user id valid
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the equipment by ID to check and update its quantity
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }
    await equipment.save();

    // Check if there is enough equipment available to make the reservation
    if (equipment.qty <= 0) {
      return res
        .status(400)
        .json({ error: "No equipment available for reservation" });
    }

    async function performTransaction() {
      const session = await mongoose.startSession();

      (await session).startTransaction;
      try {
        // Update the equipment's quantity
        equipment.qty -= 1; // Decrease the quantity by 1
        await equipment.save({ session: session });
        const savedReservation = await newReservation.save({
          session: session,
        });
        res.json(savedReservation);
        (await session).commitTransaction; // Commit the transaction
        (await session).endSession; // End the session
      } catch (error) {
        // Handle errors and abort the transaction on failure
        console.error("Transaction error:", error);
        (await session).abortTransaction;
        (await session).endSession;
      }
    }

    // Call the function to perform the transaction
    performTransaction();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not create reservation", details: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedEquipment = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEquipment) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(updatedEquipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not update reservation", details: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedEquipment = await Reservation.findByIdAndRemove(req.params.id);
    if (!deletedEquipment) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    res.json(deletedEquipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not delete reservation", details: error.message });
  }
};
