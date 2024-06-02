require("dotenv").config();

module.exports = {
  // host: "smtp.ethereal.email",
  // port: 587,
  auth: {
    // user: "melissa.flatley14@ethereal.email",
    // pass: "sd65SrR9V2R962EYtF",
    user: "sodjanathan@gmail.com",
    pass: process.env.APP_SECRET,
  },
  service: "gmail",
};
