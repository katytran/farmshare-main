const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/authentication");

/**
 * @route GET api/users
 * @description Get all users
 * @access Admin login required
 */
router.get(
  "/",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.get
);

/**
 * @route GET api/users/:id
 * @description Get a specific user by ID
 * @access Admin login required
 */
router.get(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.getById
);

/**
 * @route POST api/users
 * @description Create a new user
 * @access Public
 */
router.post("/", userController.create);

/**
 * @route PUT api/users/:id
 * @description Update a specific user by ID
 * @access Admin login required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.update
);

/**
 * @route DELETE api/users/:id
 * @description Delete a specific user by ID
 * @access Admin login required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  userController.delete
);

module.exports = router;
