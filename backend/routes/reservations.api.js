const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservations.controller");
const authMiddleware = require("../middlewares/authentication");

/**
 * @route GET api/reservations
 * @description Get all equipments
 * @access Admin login required
 */
router.get(
  "/",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  reservationController.get
);

/**
 * @route POST api/reservations
 * @description Create a new reservation
 * @access Admin login required
 */
router.post(
  "/",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  reservationController.create
);

/**
 * @route PUT api/reservations/:id
 * @description Update a reservation by ID
 * @access Admin login required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  reservationController.update
);

/**
 * @route DELETE api/reservations/:id
 * @description Delete a reservation by ID
 * @access Admin login required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  authMiddleware.adminRequired,
  reservationController.delete
);

module.exports = router;
