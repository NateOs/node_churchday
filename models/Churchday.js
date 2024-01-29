const mongoose = require("mongoose");
const { toDate } = require("validator");

const ChurchdaySchema = mongoose.Schema({
  attendance: {
    type: Number,
    required: true,
  } /* shd be updated everytime a new item is inserted in Attendance schema */,
  speaker: { type: String },
  comment: { type: String },
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
