const express = require("express");
const bookingRouter = express.Router();
const bookingControllers = require("../controllers/bookingControllers");
const userAuth = require("../middlewares/userAuth");






bookingRouter.post("/bookings", userAuth,bookingControllers.bookingPage)
bookingRouter.get("/bookings", userAuth,bookingControllers.bookedPage)

  
  
module.exports =bookingRouter