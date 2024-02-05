const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const createMember = async (req, res) => {
  res.status(StatusCodes.OK).send("Member created");
};

const getMember = async (req, res) => {
  res.status(StatusCodes.OK).send("get member");
};

const updateMember = async (req, res) => {
  res.status(StatusCodes.OK).send("update member");
};

const deleteMember = async (req, res) => {
  res.status(StatusCodes.OK).send("delete member");
};

module.exports = { createMember, getMember, deleteMember, updateMember };
