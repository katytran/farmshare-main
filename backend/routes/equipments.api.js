const express = require("express");
const router = express.Router();
const equipmentsController = require("../controllers/equipments.controller");
const authMiddleware = require("../middlewares/authentication");

/**
 * @route GET api/equipments
 * @description Get all equipments
 * @access Public
 */
router.get("/", equipmentsController.get);

/**
 * @route GET api/equipments/:id
 * @description Get a specific equipment by ID
 * @access Public
 */
router.get("/:id", equipmentsController.getById);

/**
 * @route POST api/equipments
 * @description Create a new equipment
 * @access Admin required
 */
router.post(
  "/",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  equipmentsController.create
);

/**
 * @route PUT api/equipments/:id
 * @description Update a specific equipment by ID
 * @access Admin required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  equipmentsController.update
);

/**
 * @route DELETE api/equipments/:id
 * @description Delete a specific equipment by ID
 * @access Admin required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  equipmentsController.delete
);

module.exports = router;
