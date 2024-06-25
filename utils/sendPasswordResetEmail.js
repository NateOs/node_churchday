const sendEmail = require("./sendEmail");

const sendPasswordResetEmail = async ({
  name, token, email, origin,
}) => {
  const resetURL = `${origin}/reset-password?email=${email}&token=${token}`;
  const message = ` <a href="${resetURL}">Reset link here</a> </p>`;
  await sendEmail({
    to: email,
    subject: "Password reset",
    html: `
    <div>
        <p>Hello, ${name}</p>
       
    </div>
  ${message}`,
  });
};

module.exports = sendPasswordResetEmail;
