const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
const UserModel = require("./models/User.js");
const upload = require("./utils/fileUpload.js");
const userAuth = require("./middlewares/userAuth.js");
const userRouter = require("./routes/userRouter.js");
const placeRouter = require("./routes/placeRouter.js");
const bookingRouter = require("./routes/bookingRouter.js");


require("dotenv").config();
const app = express();


mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL1, process.env.CLIENT_URL2],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/", userRouter);
app.use("/", placeRouter);
app.use("/", bookingRouter);



app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});




app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server runnung");
  }
});
