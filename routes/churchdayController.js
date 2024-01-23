const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getAllChurchdays } = require("../controllers/churchdayController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllChurchdays);

module.exports = router;
