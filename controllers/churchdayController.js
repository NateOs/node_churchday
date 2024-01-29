const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const Churchday = require("../models/Churchday");

const getAllChurchdays = async (req, res) => {
  res.send("calls returned");
};

const createChurchday = async (req, res) => {
  const churchday = await Churchday.create(req.body);
  res.status(StatusCodes.CREATED).json({ churchday });
};


module.exports = {
  getAllChurchdays,
  createChurchday,
};
