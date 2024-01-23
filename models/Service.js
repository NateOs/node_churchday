const mongoose = require("mongoose");
const { toDate } = require("validator");

const
	ServiceSchema = mongoose.Schema({
  service_type:[],
  service_type: { type: String, required: true },
  start_time: { type: Date },
  end_time: { type: Date },
  location: { type: String, required: true },
  attendance: {
    type: Number,
    required: true,
  } /* shd be updated everytime a new item is inserted in Attendance schema */,
  speaker: { type: String },
  theme: { type: String },
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

module.exports = mongoose.model("Churchday", ServiceSchema);

