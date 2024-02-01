const mongoose = require("mongoose");
const { toDate } = require("validator");

const ChurchdaySchema = mongoose.Schema({
  attendance: {
    type: Number,
    required: false,
  } /*TODO  shd be updated everytime a new item is inserted in Attendance schema */,
  speaker: { type: String },
  comment: { type: String },
  service_type: {
    type: String,
    required: [false, "enter the type of church service, eg. Christmas service"],
    enum: {
      values: [
        "christmas",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "easter",
      ],
      message: "{VALUE is not supported}",
    },
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: false,
  },
});

module.exports = mongoose.model("Churchday", ChurchdaySchema);
