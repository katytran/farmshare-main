const User = require("../models/user");
const bcrypt = require("bcrypt");
const validation = require("../helpers/validation.helper");
const utilsHelper = require("../helpers/utils.helper");

/**
 * GET /api/users
 * Fetches a list of users.
 */
exports.get = async (req, res, next) => {
  try {
    const users = await User.find();
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { users },
      null,
      "Users fetched successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Fetches a single user by its ID.
 */
exports.getById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(new Error(`404 - User id: ${userId} not found.`));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      `Get user id: ${userId} successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users
 * Register a new user
 * Creates a new user record to users list.
 */
exports.create = async (req, res, next) => {
  try {
    const { error } = await validation.register.validateAsync(req.body);
    if (error) {
      return next(`404 - ${error.details[0].message}`);
    }

    let { firstName, lastName, email, password } = req.body;
    const emailExisted = await User.findOne({ email: email });
    if (emailExisted) {
      return next(new Error("401 - Email already exists"));
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await User.create({ firstName, lastName, email, password });
    utilsHelper.sendResponse(
      res,
      201,
      true,
      { user },
      null,
      "Account created successfully"
    );
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id
 * Updates an existing user record by its ID.
 */
exports.update = async (req, res, next) => {
  try {
    const { error } = await validation.update.validateAsync(req.body);
    if (error) {
      return next(`404 - ${error.details[0].message}`);
    }
    let { firstName, lastName, password, practices, farmLocations } = req.body;

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        password,
        practices,
        farmLocations,
      },
      {
        new: true,
      }
    );
    if (!user) {
      return next(new Error("404 - User not found"));
    }
    utilsHelper.sendResponse(
      res,
      200,
      true,
      { user },
      null,
      `User ${req.params.id} Updated Successfully`
    );
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id
 * Deletes a user record by its ID.
 */
exports.delete = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return next(new Error("404 - User not found"));
    }
    utilsHelper.sendResponse(
      res,
      204,
      true,
      null,
      null,
      `User ${req.params.id} Delete Successfully`
    );
  } catch (error) {
    next(error);
  }
};
