const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const Service = require("../models/Service");

const getAllServices = async (req, res) => {
  const services = await Service.find({});
  if (!services) {
    throw new CustomError.NotFoundError("no services found");
  }
  res.status(StatusCodes.OK).json({ hits: services.length, services });
};

const createService = async (req, res) => {
  const {
    start_time,
    end_time,
    location,
    attendance,
    speaker,
    theme,
    owner,
    churchday,
    otherFields,
  } = req.body;

  const serviceData = {
    start_time,
    end_time,
    location,
    attendance,
    speaker,
    theme,
    owner,
    churchday,
    ...otherFields,
  };

  const service = await Service.create(serviceData);
  res.status(StatusCodes.CREATED).json({ service });
};

const getService = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const service = await Service.findById(id);
  if (!service) {
    throw new CustomError.NotFoundError(
      "service with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({ service });
};

const updateService = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const service = await Service.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!service) {
    throw new CustomError.NotFoundError(
      "service with id " + id + " does not exist",
    );
  }
  res.status(StatusCodes.OK).json({
    msg: "service with id:" + id + " updated successfully",
    service,
  });
};

/* TODO delete a service */
const deleteService = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    throw new CustomError(StatusCodes.BAD_REQUEST, "id is required");
  }
  const service = await Service.findById(id);
  if (!service) {
    throw new CustomError.NotFoundError(
      "service with id " + id + " does not exist",
    );
  }
  await service.remove();
  res.send("delete a service");
};

module.exports = {
  getAllServices,
  createService,
  getService,
  updateService,
  deleteService,
};
