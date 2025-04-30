const express = require("express");
const router = express();
const userAuth = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");
const { body } = require("express-validator");

router.post(
  "/create",
  [
    body("pickup")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Pickup Location"),

    body("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Invalid Destination Location"),
    body("vehicleType")
      .isString()
      .isIn(["car", "auto", "moto"])
      .withMessage("Invalid Vehicle Type Location"),
  ],
  userAuth.authUser,
  rideController.createRide
);

module.exports = router;
