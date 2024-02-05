const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authentication");
const { authenticateUser } = require("../middleware/authentication");

const {
  createMember,
  getMember,
  updateMember,
  deleteMember,
} = require("../controllers/membershipController");

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin"),
    getMember,
    createMember,
    deleteMember,
    updateMember,
  )
  .post(authenticateUser, authorizePermissions("admin"), createMember);

router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateMember)
  .delete(authenticateUser, authorizePermissions("admin"), deleteMember);
module.exports = router;
