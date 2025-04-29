const { validationResult } = require("express-validator");
const captainModel = require("../model/captain.model");
const blacklistTokenModel = require("../model/blacklistToken.model");
const captainService = require("../services/captain.service");

module.exports.registerCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    res.status(401).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const existingCaptain = await captainModel.findOne({ email });
  if (existingCaptain) {
    console.log("Existing Captain: ", existingCaptain);
    res.status(400).json({ message: "Captian already exists" });
    return;
  }
  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain(
    fullname.firstname,
    fullname.lastname,
    hashedPassword,
    email,
    vehicle.color,
    vehicle.vehicleType,
    vehicle.plate,
    vehicle.capacity
  );
  const token = captain.generateAuthToken();
  res.status(200).json({ token, captain });
};

module.exports.loginCaptain = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    console.log("Errors: ", errors.array());
    res.status(401).json({ errors: errors.array() });
    return;
  }
  const { email, password } = req.body;
  const existingCaptain = await captainModel
    .findOne({ email })
    .select("+password");
  if (!existingCaptain) {
    res.status(401).json({ message: "Invaild email or password" });
    return;
  }
  const hashedPassword = existingCaptain.password;
  const ans = existingCaptain.comparePassword(existingCaptain.password);
  if (!ans) {
    res.status(401).json({ message: "Invaild Credintials" });
    return;
  }
  const token = existingCaptain.generateAuthToken();
  res.status(200).json({ token, captain: existingCaptain });
};

module.exports.getProfile = async (req, res) => {
  res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization;
  // await blacklistTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
