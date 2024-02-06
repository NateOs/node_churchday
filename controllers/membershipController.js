const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const Member = require("../models/Member");

const createMember = async (req, res) => {
  const member = await Member.create(req.body);
  if (!member) {
    throw new CustomError.NotFoundError("Member creation failed");
  }
  res
    .status(StatusCodes.OK)
    .send({ msg: "Member created successfully", member });
};

const getMember = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError.NotFoundError(
      StatusCodes.BAD_REQUEST,
      "id is required",
    );
  }

  const member = await Member.findById(id);

  if (!member) {
    throw new CustomError.NotFoundError(
      "member with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).send({ member });
};

const updateMember = async (req, res) => {
  res.status(StatusCodes.OK).send("update member");
};

const deleteMember = async (req, res) => {
  res.status(StatusCodes.OK).send("delete member");
};

module.exports = { createMember, getMember, deleteMember, updateMember };
