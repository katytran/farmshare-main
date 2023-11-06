const express = require("express");
const router = express.Router();
const authApi = require("./auth.api");
const usersApi = require("./users.api");
const equipmentsApi = require("./equipments.api");
const reservationsApi = require("./reservations.api");

router.use("/auth", authApi);
router.use("/users", usersApi);
router.use("/equipments", equipmentsApi);
router.use("/reservations", reservationsApi);

module.exports = router;
