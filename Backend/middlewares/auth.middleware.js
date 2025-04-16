const userModel = require("../model/user.model");
const captainModel = require("../model/captain.model");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../model/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await blacklistTokenModel.findOne({ token: token });
  if (isBlackListed) {
    log("Blacklisted Token: ", isBlackListed);
    return res.status(401).json({
      message: "Unauthorized....",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    return next();
  } catch (e) {
    console.log("Error: ", e);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlackListed = await blacklistTokenModel.findOne({
    token: `bearer ${token}`,
  });
  if (isBlackListed) {
    console.log("Token is blacklisted");
    return res.status(401).json({
      message: "Unauthorized....",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.captain = captain;
    return next();
  } catch (e) {
    console.log("Error: ", e);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
