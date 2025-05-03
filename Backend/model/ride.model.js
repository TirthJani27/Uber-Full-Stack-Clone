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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
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
    required: true,
  },
});
const rideModel = mongoose.model("Ride", rideSchema);
module.exports = rideModel;
