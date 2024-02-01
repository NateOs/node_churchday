const mongoose = require("mongoose");
const { toDate } = require("validator");

const ServiceSchema = mongoose.Schema({
  start_time: { type: Date },
  end_time: { type: Date },
  location: { type: String, required: true },
  attendance: {
    type: Number,
    required: true,
  } /* shd be updated everytime a new item is inserted in Attendance schema */,
  speaker: { type: String },
  theme: { type: String },
  churchday: {
    type: mongoose.Schema.ObjectId,
    ref: "Churchday",
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
