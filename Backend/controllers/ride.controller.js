const rideService = require("../services/ride.service");
const mapService = require("../services/map.service");
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");
const captainModel = require("../model/captain.model");
const rideModel = require("../model/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  let user = req.user;
  user = user._id;
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user,
      pickup,
      destination,
      vehicleType,
    });
    const pickupCoordinates = await mapService.getAddress(pickup);
    console.log(pickupCoordinates);
    const captaniInRadius = await mapService.getCaptainInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      10
    );
    console.log(captaniInRadius);
    ride.otp = "";
    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user");
    captaniInRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: rideWithUser,
      });
    });
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports.getFair = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const { pickup, destination } = req.query;

  try {
    const fair = await rideService.getFair(pickup, destination);
    return res.status(200).json(fair);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
