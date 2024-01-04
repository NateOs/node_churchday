const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p> Please confirm your email address:
   <a href="${verifyEmail}">Verify here</a> </p>`;
  await sendEmail({
    to: email,
    subject: "Email verification",
    html: `<p>Hello ${name}</p>
  ${message}`,
  });
};

module.exports = sendVerificationEmail;
