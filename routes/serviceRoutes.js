const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const {
  getAllServices,
  createService,
  getService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllServices)
  .post(authenticateUser, authorizePermissions("admin"), createService);

router
  .route("/:id")
  .get(authenticateUser, authorizePermissions("admin"), getService)
  .patch(authenticateUser, authorizePermissions("admin"), updateService)
  .delete(authenticateUser, authorizePermissions("admin"), deleteService);

module.exports = router;
