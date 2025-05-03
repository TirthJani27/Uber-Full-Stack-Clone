const captainModel = require("../model/captain.model");
const rideModel = require("../model/ride.model");
const { sendMessageToSocketId } = require("../socket");
const mapService = require("./map.service");
const crypto = require("crypto");

async function calculateFair(pickup, destination, vehicleType) {
  const distanceTime = await mapService.getDistace(pickup, destination);

  const baseRates = {
    auto: 10,
    moto: 8,
    car: 15,
  };

  const ratePerKm = baseRates[vehicleType];
  if (!ratePerKm) {
    throw new Error("Invalid vehicle type");
  }

  const fair = (parseInt(distanceTime.res.distance.value) / 1000) * ratePerKm;
  return fair;
}

async function calculateFairAllVehicle(pickup, destination) {
  const distanceTime = await mapService.getDistace(pickup, destination);

  const baseRates = {
    auto: 10,
    moto: 8,
    car: 15,
  };

  const fares = {};
  for (const vehicleType in baseRates) {
    const ratePerKm = baseRates[vehicleType];
    fares[vehicleType] = parseInt(
      (parseInt(distanceTime.res.distance.value) / 1000) * ratePerKm
    ).toFixed(2);
  }

  return fares;
}

async function getOtp(num) {
  const otp = Math.floor(Math.random() * Math.pow(10, num))
    .toString()
    .padStart(num, "0");
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  return { otp, hashedOtp };
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All field are required");
  }
  const fare = await calculateFair(pickup, destination, vehicleType);
  const otp = await getOtp(6);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare,
    otp: parseInt(otp.otp),
  });
  return ride;
};

module.exports.confirmRide = async (rideId, captainId) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  const captain = await captainModel.findOne({ _id: captainId });
  if (!captain) {
    throw new Error("Captain not found");
  }

  await rideModel.findOneAndUpdate(
    { _id: rideId },
    {
      status: "accepted",
      captain: captain._id,
    }
  );
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain");
  if (!ride) {
    throw new Error("Ride not found ");
  }
  return ride;
};

module.exports.startRide = async ({ rideId, captain, otp }) => {
  if (!rideId || !captain || !otp) {
    throw new Error("Ride id, captain, and OTP are required");
  }

  let ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain");
  console.log("THis is the ride ", ride);

  if (!ride) throw new Error("Ride not found");
  if (ride.otp !== parseInt(otp)) {
    throw new Error("Invalid OTP");
  }

  ride = await rideModel
    .findOneAndUpdate({ _id: rideId }, { status: "ongoing" }, { new: true })
    .populate("user")
    .populate("captain");

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-started",
    data: ride,
  });

  return ride;
};

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride id and captain are required");
  }

  let ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain");

  if (!ride) throw new Error("Ride not found");

  ride = await rideModel
    .findOneAndUpdate({ _id: rideId }, { status: "completed" })
    .populate("user")
    .populate("captain");
  console.log(ride.user.socketId);

  sendMessageToSocketId(ride.user.socketId, {
    event: "ride-ended",
    data: ride,
  });

  return ride;
};

module.exports.getFair = calculateFairAllVehicle;
