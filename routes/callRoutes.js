const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { getAllCalls } = require("../controllers/callController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllCalls);

module.exports = router;
