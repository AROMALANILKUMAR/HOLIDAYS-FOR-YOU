const jwt = require("jsonwebtoken");

const BookingModel = require("../models/Booking");


const bookingPage = async (req, res) => {
  try {
    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
      req.body;
      

    BookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: req.userId,
    })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.log(error);
  }
};

const bookedPage = async (req, res) => {
  try {
    res.json(await BookingModel.findById(req.params.id).populate("place"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  bookingPage,
  bookedPage,
};
