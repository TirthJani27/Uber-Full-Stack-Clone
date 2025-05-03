const express = require("express");
const router = express();
const userAuth = require("../middlewares/auth.middleware");
const rideController = require("../controllers/ride.controller");
const { body, query } = require("express-validator");

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

router.get(
  "/get-fair",
  query("pickup").isString().isLength({ min: 3 }).withMessage("Invalid Pickup"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Destination"),
  userAuth.authUser,
  rideController.getFair
);

router.post(
  "/confirm",
  userAuth.authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride Id"),
  rideController.confirmRide
);

router.get(
  "/start-ride",
  [
    query("rideId").isMongoId().withMessage("Invalid ride Id"),
    query("otp")
      .isString()
      .isLength({ min: 6, max: 6 })
      .withMessage("Invalid otp"),
  ],
  userAuth.authCaptain,
  rideController.startRide
);

router.post(
  "/end-ride",
  body("rideId").isMongoId().withMessage("Invalid ride Id"),
  userAuth.authCaptain,
  rideController.endRide
);
module.exports = router;
