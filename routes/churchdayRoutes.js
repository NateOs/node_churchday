const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllChurchdays,
  createChurchday,
} = require("../controllers/churchdayController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllChurchdays);

router
  .route("/")
  .post(
   // authenticateUser, authorizePermissions("admin"),
    createChurchday);

module.exports = router;
