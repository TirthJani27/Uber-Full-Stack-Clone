const rideModel = require("../model/ride.model");
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
    otp: otp.otp,
  });
  return ride;
};

module.exports.getFair = calculateFairAllVehicle;
