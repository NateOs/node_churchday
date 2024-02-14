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

const getAllMembers = async (req, res) => {
  const members = await Member.find({});
  res.status(StatusCodes.OK).send({ hits: members.length, members });
};

const updateMember = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "item with id " + id + " does not exist" });
  }
  const member = await Member.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!member) {
    throw new CustomError.NotFoundError(
      "member with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({ member });
};

const deleteMember = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const member = await Member.findByIdAndDelete(id);
  if (!member) {
    throw new CustomError.NotFoundError(
      "member with id " + id + " does not exist",
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "member deleted successfully", member });
};

module.exports = {
  createMember,
  getMember,
  getAllMembers,
  deleteMember,
  updateMember,
};
