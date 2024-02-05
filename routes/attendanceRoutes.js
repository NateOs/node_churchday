const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllAttendance,
  createAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllAttendance)
  .post(authenticateUser, authorizePermissions("admin"), createAttendance);

router
  .route("/:id")
  .delete(authenticateUser, authorizePermissions("admin"), deleteAttendance);

module.exports = router;
