const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  let info = await transporter.sendMail({
    from: "Nathan Sodja  < sodjanathan@gmail.com > ",
    to,
    subject,
    html,
  });

  console.log(info);
};

module.exports =  sendEmail ;
