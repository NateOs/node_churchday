const mongoose = require("mongoose");
const { toDate } = require("validator");

const ServiceSchema = mongoose.Schema({
  service_type: {
    type: String,
    required: [true, "enter the type of church service, eg. Christmas service"],
    enum: {
      values: [
        "Christmas",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Easter",
      ],
      message: "{VALUE is not supported}",
    },
  },
  start_time: { type: Date },
  end_time: { type: Date },
  location: { type: String, required: true },
  attendance: {
    type: Number,
    required: true,
  } /* shd be updated everytime a new item is inserted in Attendance schema */,
  speaker: { type: String },
  theme: { type: String },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
