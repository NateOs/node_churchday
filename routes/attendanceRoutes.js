const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const { getAllAttendance } = require("../controllers/attendanceController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllAttendance);

module.exports = router;
