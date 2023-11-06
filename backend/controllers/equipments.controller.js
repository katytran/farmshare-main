const Equipment = require("../models/equipment");
const utilsHelper = require("../helpers/utils.helper");

/**
 * GET /api/equipments
 * Fetches a list of equipments.
 */
exports.get = async (req, res, next) => {
  try {
    const equipments = await Equipment.find();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      equipments,
      null,
      "Equipments fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/equipments/:id
 * Fetches a single equipment by its ID.
 */
exports.getById = async (req, res, next) => {
  try {
    const equipmentId = req.params.id;
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return next(new Error(`404 - Equipment id: ${equipmentId} not found.`));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { equipment },
      null,
      `Get equipment id: ${equipmentId} successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/equipments
 * Creates a new equipment record to equipments list.
 */
exports.create = async (req, res, next) => {
  try {
    const newEquipment = new Equipment(req.body);
    const savedEquipment = await newEquipment.save();
    utilsHelper.sendResponse(
      res,
      201,
      true,
      savedEquipment,
      null,
      "Equipment created successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/equipments/:id
 * Updates an existing equipment record by its ID.
 */
exports.update = async (req, res, next) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!equipment) {
      return next(new Error("404 - Equipment not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { equipment },
      null,
      `Equipment ${equipment.name} Updated Successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/equipments/:id
 * Deletes an equipment record by its ID.
 */
exports.delete = async (req, res, next) => {
  try {
    const deletedEquipment = await Equipment.findByIdAndRemove(req.params.id);
    if (!deletedEquipment) {
      return next(new Error("404 - Equipment not found"));
    }
    utilsHelper.sendResponse(
      res,
      204,
      true,
      null,
      null,
      "Equipment deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};
