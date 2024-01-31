const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllChurchdays,
  createChurchday,
  getChurchday,
  deleteChurchday,
  updateChurchday,
} = require("../controllers/churchdayController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllChurchdays)
  .post(authenticateUser, authorizePermissions("admin"), createChurchday);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getChurchday)
  .delete(authenticateUser, authorizePermissions("admin"), deleteChurchday)
  .patch(authenticateUser, authorizePermissions("admin"), updateChurchday);

module.exports = router;
