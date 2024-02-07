const express = require("express");
const router = express.Router();
const { authorizePermissions } = require("../middleware/authentication");
const { authenticateUser } = require("../middleware/authentication");

const {
  createMember,
  getMember,
  getAllMembers,
  updateMember,
  deleteMember,
} = require("../controllers/membershipController");

router
  .route("/")
  .get(
    authenticateUser,
    authorizePermissions("admin"),
    getAllMembers,
    getMember,
    createMember,
    deleteMember,
    updateMember,
  )
  .post(authenticateUser, authorizePermissions("admin"), createMember);

router
  .route("/:id")
  .patch(authenticateUser, authorizePermissions("admin"), updateMember)
  .get(authenticateUser, authorizePermissions("admin"), getMember)
  .delete(authenticateUser, authorizePermissions("admin"), deleteMember);
module.exports = router;
