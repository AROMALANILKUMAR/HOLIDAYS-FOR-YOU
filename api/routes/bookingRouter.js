const express = require("express");
const bookingRouter = express.Router();
const bookingControllers = require("../controllers/bookingControllers");
const userAuth = require("../middlewares/userAuth");






bookingRouter.post("/booking", userAuth,bookingControllers.bookingPage)
bookingRouter.get("/bookings/:id", userAuth,bookingControllers.bookedPage)

  
  
module.exports =bookingRouter