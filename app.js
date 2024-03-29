require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const churchdayRouter = require("./routes/churchdayRoutes");
const serviceRouter = require("./routes/serviceRoutes");
const attendanceRouter = require("./routes/attendanceRoutes");
const memberRouter = require("./routes/memberRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  }),
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Server Up</title>
</head>
<body>
  <h1>churchday server is up and running!</h1>
  <a href="
  https://app.getpostman.com/join-team?invite_code=da95b69bacd375be1fa7565a19ccf08a&target_code=9773a029bef2252ec49b850d826b5164
  ">here for docs!</a>
  // put postman docs here
</body>
</html>
`;

app.get("/", (req, res) => {
  console.log("Server is up and running");
  res.status(200).send(htmlContent);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/churchday", churchdayRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/member", memberRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
