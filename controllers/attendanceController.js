const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const Attendance = require("../models/Attendance");

const getAllAttendance = async (req, res) => {
  /*   const attendance = await Service.find({});
  if (!services) {
    throw new CustomError.NotFoundError("no attendance records found");
  }
  res.status(StatusCodes.OK).json({ hits: services.length, services }); */
  res.send("Attendance data is available");
};
const createAttendance = async (req, res) => {
  /*   const attendance = await Service.find({});
  if (!services) {
    throw new CustomError.NotFoundError("no attendance records found");
  }
  res.status(StatusCodes.OK).json({ hits: services.length, services }); */
  res.send("Attendance data is available");
};

module.exports = {
  getAllAttendance,
};
