
const jwt = require("jsonwebtoken");




const PlaceModel = require("../models/Place.js");



const uploadFile = async (req, res) => {
  console.log(req.files)
  const uploadedFiles = req.files?.map((file)=>file.filename)


  res.json(uploadedFiles);
};

const createPlace = async (req, res) => {
  // const { token } = req.cookies;
  try {
    const userId=req.userId
    const {
      title,
      address,
      addedPhotos,
      description,
      price,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body;
    
      
      const placeDoc = await PlaceModel.create({
        owner: userId,
        price,
        title,
        address,
        photos: addedPhotos ,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      });
      res.json(placeDoc);
    
  } catch (error) {
    console.log(error);
  }
 
};

const userPlaces = async (req, res) => {
  try {
    const { id } = userData;
    res.json(await PlaceModel.find({ owner: id }));
  } catch (error) {
    console.log(error);
  }
};
const placeId = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await PlaceModel.findById(id));
  } catch (error) {
    console.log(error);
  }
};

const listPlace = async (req, res) => {
  try {
    console.log(req.userId);
    const userId = req.userId;
    const {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    const placeDoc = await PlaceModel.findById(id);
    if (userId === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  } catch (error) {
    console.log(error);
  }
};


const findPlace= async (req, res) => {
    try {
        res.json(await PlaceModel.find());
    } catch (error) {
        console.log(error)
    }
   
  }



module.exports = {
  uploadFile,
  createPlace,
  userPlaces,
  placeId,
  listPlace,
  findPlace
};
