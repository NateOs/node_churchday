const mongoose = require("mongoose");
const { toDate } = require("validator");

const MemberSchema = mongoose.Schema({
  surname: { type: String, required: true },
  other_names: { type: String, required: true },
  age: { type: Number },
  gender: { type: String, required: true },
  occupation: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: true },
  address: { type: String, required: true },
  marital_status: {
    type: String,
    required: [true, "Please enter marital status"],
    enum: ["married", "single", "divorced", "separated"],
  },
  number_of_children: { type: Number, required: false },
  spouse_name: { type: String, required: false },
  saved_or_not: { type: Boolean, required: true },
  baptism_status: { type: Boolean, required: false },
  baptism_date: { type: Date, required: false },
  ministry_membership: {
    type: String,
    required: [true, "Please enter marital status"],
    enum: ["Men's", "Women's", "Children's", "Other"],
  },
  emergency_contact: { type: String, required: false },
  faith_declaration_status: { type: Boolean, required: false },
  owner: {
    // who created the record
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Member", MemberSchema);

// TODO create id field that is generated, format PJMT001...
