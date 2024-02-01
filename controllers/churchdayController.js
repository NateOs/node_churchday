const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const Churchday = require("../models/Churchday");

const getAllChurchdays = async (req, res) => {
  const churchdays = await Churchday.find({});
  if (!churchdays) {
    throw new CustomError.NotFoundError(
      "churchday with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({ hits: churchdays.length, churchdays });
};

const createChurchday = async (req, res) => {
  const churchday = await Churchday.create(req.body);
  res.status(StatusCodes.CREATED).json({ churchday });
};

const getChurchday = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const churchday = await Churchday.findById(id);
  if (!churchday) {
    throw new CustomError.NotFoundError(
      "churchday with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({ churchday });
};

const deleteChurchday = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const churchday = await Churchday.findByIdAndDelete(id);
  if (!churchday) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "churchday with id " + id + " does not exist" });
  }
  res.status(StatusCodes.OK).json({ churchday });
};

const updateChurchday = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "item with id " + id + " does not exist" });
  }

  const churchday = await Churchday.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!churchday) {
    throw new CustomError.NotFoundError(
      "churchday with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({ churchday });
};

module.exports = {
  getAllChurchdays,
  getChurchday,
  createChurchday,
  deleteChurchday,
  updateChurchday,
};
