const mongoose = require("mongoose");
const { toDate } = require("validator");

const AttendanceSchema = mongoose.Schema({
  check_in: { type: Date },
  check_out: { type: Date },
  member_id: { type: mongoose.Schema.ObjectId, ref: "Member", required: true },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
