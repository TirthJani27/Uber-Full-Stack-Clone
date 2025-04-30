const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const rideSchema = new mongoose.Schema({
  user: {
    ref: "User",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  captain: {
    req: "Captain",
    type: mongoose.Schema.Types.ObjectId,
  },
  pickup: {
    required: true,
    type: String,
  },
  destination: {
    required: true,
    type: String,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
    default: "pending",
  },
  duratation: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderID: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: Number,
    select: false,
    required: true,
  },
});
const rideModel = mongoose.model("Ride", rideSchema);
module.exports = rideModel;
