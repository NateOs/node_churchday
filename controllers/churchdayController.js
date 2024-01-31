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

//TODO get a churchday
const getChurchday = async (req, res) => {
  const id = req.params.id;
  res.status(StatusCodes.OK).json({ msg: `${id}, get churchday` });
};

//TODO delete a churchday
const deleteChurchday = async (req, res) => {
  const id = req.params.id;
  res.status(StatusCodes.OK).json({ msg: `${id}, delete churchday` });
};
//TODO update a churchday
const updateChurchday = async (req, res) => {
  const id = req.params.id;
  res.status(StatusCodes.OK).json({ msg: `${id}, update churchday` });
};


module.exports = {
  getAllChurchdays,
  getChurchday,
  createChurchday,
  deleteChurchday,
  updateChurchday,
};
