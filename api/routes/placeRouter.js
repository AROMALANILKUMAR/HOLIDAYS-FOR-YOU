const express = require("express");
const placeRouter = express.Router();
const placeControllers = require("../controllers/placeControllers");
const userAuth = require("../middlewares/userAuth");
const upload = require("../utils/fileUpload");




placeRouter.post(
  "/upload",
  upload.array("photos", 10),
  placeControllers.uploadFile
);
placeRouter.post("/places",userAuth, placeControllers.createPlace);
placeRouter.get("/userPlaces", userAuth, placeControllers.userPlaces);
placeRouter.get("/places/:id", placeControllers.placeId);
placeRouter.put("/places",userAuth,placeControllers.listPlace)
placeRouter.get("/places",placeControllers.findPlace)


module.exports = placeRouter
