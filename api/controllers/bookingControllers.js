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
      user: userData.id,
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
    res.json(await BookingModel.find({ user: req.userId }).populate("place"));
  } catch (error) {
    ConditionFilterSensitiveLog.log(error);
  }
};

module.exports = {
  bookingPage,
  bookedPage,
};
