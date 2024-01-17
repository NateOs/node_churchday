const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");

const getAllChurchdays = async (req, res) => {
  res.send("calls returned");
};

module.exports = {
  getAllChurchdays,
};
