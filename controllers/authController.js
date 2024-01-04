const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendPasswordResetEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");
const { log } = require("console");

let user = {};
const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists");
  }

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:3000";

  sendVerificationEmail({ name, email, verificationToken, origin });

  res.status(StatusCodes.CREATED).json({
    msg: "user created successfully, check email to verify account",
    verificationToken: verificationToken,
  });

  console.log(verificationToken);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }
  user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isUserVerified = user.isVerified;

  if (!isUserVerified) {
    throw new CustomError.UnauthenticatedError("User email is not verified");
  }

  const tokenUser = createTokenUser(user);
  // create refresh token
  let refreshToken = "";

  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  // if no existing token is available then create a new one
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  const token = await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  console.log(user);
  console.log(req.user);
  await Token.findOneAndDelete({ user: user.userId });
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new CustomError.NotFoundError("Verification failed");
  }

  if (user.verificationToken !== verificationToken) {
    throw new CustomError.UnauthenticatedError("Verification failed");
  }

  user.isVerified = true;
  user.verificationToken = "";
  user.verified = Date.now();

  await user.save();

  res.status(StatusCodes.OK).json({
    email: email,
    msg: "your email has been verified, thanks",
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const origin = "http://localhost:3000";

  if (!email) {
    throw new CustomError.BadRequestError("Invalid email address");
  }

  const user = await User.findOne({ email: email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    sendPasswordResetEmail({
      name: user.name,
      email: user.email,
      origin,
      token: passwordToken,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = passwordToken;
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();
  }
  res.status(StatusCodes.OK).json({ msg: "check your email for instructions" });
};

const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  if (!email || !token || !password) {
    throw new CustomError.BadRequestError("Please provide all required fields");
  }

  const user = await User.findOne({ email: email });

  if (user) {
    const currentDate = new Date();
    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Try logging again" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
