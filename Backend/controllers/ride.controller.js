const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  const user = req.user._id;
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await rideService.createRide({
      user,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
